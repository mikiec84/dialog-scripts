// @flow strict

type Env = { [key: string]: string };

export function getEnvSubset(env: Env, prefix: string): Env {
  return Object.keys(env)
    .filter((key) => key.startsWith(prefix))
    .reduce((vars, key) => ({ ...vars, [key]: env[key] }), {});
}
