/*
 * Copyright 2016 Dialog LLC <info@dlg.im>
 * @flow
 */

export type SentryConfig = {
  url?: string,
  apiKey: string,
  project: string,
  organisation: string
};

export type WebOptions = {
  root: string,
  entry: {
    js: string,
    css: string,
    html: string
  },
  paths: {
    js: string,
    styles: string,
    cssModules: string,
    valFiles?: string[]
  },
  favicon: string,
  output: string,
  version: string,
  override: { [path: string]: string },
  cssPrefix: string,
  environment: string,
  gzip?: boolean,
  configureSentry?: () => SentryConfig
};

export type PlatformType = 'macos' | 'linux' | 'windows';

export type DesktopPublishOptions = {
  url: string,
  username: string,
  password: string
};

export type DesktopOptions = {
  root: string,
  main: string,
  output: string,
  version: string,
  homepage: string,
  name: string,
  productName: string,
  description: string,
  author: {
    name: string,
    email: string
  },
  appId: string,
  copyright: string,
  schema: string,
  platforms: PlatformType[],
  configurePublish?: () => ?DesktopPublishOptions
};
