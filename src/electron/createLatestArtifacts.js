/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { DesktopPublishOptions } from '../types';
const path = require('path');
const Promise = require('bluebird');
const S3 = require('aws-sdk/clients/s3');

async function createLatestArtifact(
  result: string[],
  version: string,
  { region, endpoint, channel = 'latest', bucket }: DesktopPublishOptions,
) {
  const s3 = new S3({
    region,
    endpoint,
    signatureVersion: 'v4',
    s3ForcePathStyle: Boolean(endpoint),
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  const copyObject = Promise.promisify(s3.copyObject.bind(s3));

  await Promise.map(
    result,
    (fileName) => {
      const baseName = path.basename(fileName);

      return copyObject({
        Bucket: bucket,
        CopySource: `${bucket}/${baseName}`,
        Key: baseName.replace(version, channel),
        ACL: 'public-read',
      });
    },
    {
      concurrency: 1,
    },
  );
}

module.exports = createLatestArtifact;
