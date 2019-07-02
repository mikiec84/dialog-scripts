/*
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

import fs from 'fs';
import path from 'path';

export function resolveRealPath(...args: string[]): string {
  return fs.realpathSync(path.join(...args));
}

export function resolvePackageJsonPath(packageName: string): string {
  // $FlowFixMe
  return require.resolve(path.join(packageName, 'package.json'));
}

export function resolvePackagePath(packageName: string): string {
  return path.dirname(resolvePackageJsonPath(packageName));
}

export function readPackageJson(packageName: string): Object {
  const filePath = resolvePackageJsonPath(packageName);

  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

export function getPackageVersion(packageName: string): string | void {
  const pkg: Object = readPackageJson(packageName);

  return pkg.version || undefined;
}
