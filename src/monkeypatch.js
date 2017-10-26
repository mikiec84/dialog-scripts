const { getS3LikeProviderBaseUrl } = require('builder-util-runtime/out/publishOptions');

function patchedGetS3LikeProviderBaseUrl(configuration) {
  if (configuration.provider === 's3' && typeof configuration.url === 'string') {
    return configuration.url;
  }

  return getS3LikeProviderBaseUrl(configuration);
}

Object.assign(require('builder-util-runtime/out/publishOptions'), {
  getS3LikeProviderBaseUrl: patchedGetS3LikeProviderBaseUrl
});
