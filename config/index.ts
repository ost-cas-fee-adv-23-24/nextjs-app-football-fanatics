// import { EEnvironments } from '@/utils/enums/general.enum';
// import path from 'path';
// import ConfigApp from '@/utils/helpers/Config';
import config, { IConfig } from '@/config/environments/all';
import { merge as _merge } from 'lodash';

// const env = process.env.ENVIRONMENT;
// if (typeof env !== 'string') {
//   console.error('Environment variable ENVIRONMENT must be set');
// }
//
// const confRoot = path.resolve('../', process.cwd(), 'config');
// const config = new ConfigApp();
// config.loadConfig(confRoot, env as EEnvironments);

const mergeConfig = (obj: object) => {
  // @ts-ignore
  return _merge(config, obj);
};

const loadFile = async (file: string) => {
  try {
    const imported = await import(`${file}`);
    return imported.default;
  } catch (error) {
    console.log('file not found:', file);
    return {};
  }
};
(async () => {
  mergeConfig(await loadFile(`./environments/all`));
  mergeConfig(await loadFile(`./environments/local`));
  mergeConfig(await loadFile(`./secrets/local`));
})();

export default config as IConfig;
