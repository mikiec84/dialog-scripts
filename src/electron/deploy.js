/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

const fs = require('fs');
const Promise = require('bluebird');
const request = Promise.promisify(require('request'));

type Options = {
  url: string,
  username: string,
  password: string,
  version: string,
  notes?: string,
  channel: 'stable' | 'rc' | 'beta' | 'alpha'
};

async function login(url: string, username: string, password: string): Promise<string> {
  const response = await request({
    uri: url + '/api/auth/login',
    method: 'POST',
    json: true,
    body: { username, password }
  });

  if (typeof response.body.token === 'string') {
    return response.body.token;
  }

  throw new Error('Authorization failed');
}

async function hasVersion(token: string, url: string, version: string): Promise<boolean> {
  const response = await request({
    uri: url + `/api/version/${version}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.statusCode === 200;
}

async function createVersion(
  token: string,
  url: string,
  version: string,
  channel: string,
  notes?: string
): Promise<void> {
  if (await hasVersion(token, url, version)) {
    throw new Error(`Relase v${version} already exists`);
  }

  await request({
    uri: url + '/api/version',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    json: true,
    body: {
      notes,
      name: version,
      channel: {
        name: channel
      }
    }
  });

  console.log(`[deploy]: successfully created v${version} release.`);
}

async function upload(
  token: string,
  url: string,
  version: string,
  platform: string,
  fileName: string
): Promise<void> {
  await request({
    uri: url + '/api/asset',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    formData: {
      version,
      platform,
      file: fs.createReadStream(fileName)
    }
  });

  console.log(`[deploy]: successfully uploaded ${platform}@v${version}.`);

  // try to fix missing uploads
  await Promise.delay(3000);
}

async function deploy(binaries: Array<[string, string]>, options: Options): Promise<void> {
  const token = await login(options.url, options.username, options.password);
  await createVersion(token, options.url, options.version, options.channel, options.notes);

  await Promise.map(binaries, ([platform, path]) => {
    return upload(token, options.url, options.version, platform, path);
  }, {
    concurrency: 1
  });
}

module.exports = deploy;
