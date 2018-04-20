/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { DesktopPublishOptions } from '../types';
const path = require('path');
const Promise = require('bluebird');
const S3 = require('aws-sdk/clients/s3');

async function createLatestArtifact(result: string[], version: string, options: DesktopPublishOptions) {
  const s3 = Promise.promisifyAll(new S3({
    region: options.region,
    endpoint: options.endpoint,
    signatureVersion: 'v4',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }));

  await Promise.map(result, (fileName) => {
    const baseName = path.basename(fileName);

    return s3.copyObjectAsync({
      Bucket: options.bucket,
      CopySource: `${options.bucket}/${baseName}`,
      Key: baseName.replace(version, 'latest'),
      ACL: 'public-read'
    });
  }, {
    concurrency: 1
  });
}

module.exports = createLatestArtifact;
