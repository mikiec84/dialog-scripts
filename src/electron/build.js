/*
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { PlatformType } from '../types';
const { flatten } = require('lodash');
const Promise = require('bluebird');
const builder = require('electron-builder');
const createTargetByPlatform = require('./createTargetByPlatform');

async function build(platforms: PlatformType[], config: Object): Promise<string[]> {
  const result = await Promise.map(
    platforms.map(createTargetByPlatform),
    (targets) => builder.build({ ...config, targets }),
    { concurrency: 1 }
  );

  return flatten(result);
}

module.exports = build;
