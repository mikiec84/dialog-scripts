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
  main: string,
  cssMain: string,
  htmlTemplate: string,
  favicon: string,
  valFiles?: string[],
  output: string,
  version: string,
  override: { [path: string]: string },
  cssPrefix: string,
  environment: string,
  configureSentry?: () => SentryConfig
};

export type DesktopOptions = {
  main: string,
  output: string,
  version: string,
  homepage: string,
  productName: string,
  description: string,
  author: {
    name: string,
    email: string
  }
};
