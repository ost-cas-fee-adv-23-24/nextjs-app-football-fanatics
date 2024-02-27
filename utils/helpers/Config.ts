import { merge as _merge } from 'lodash';
import { EEnvironments } from '@/utils/enums/general.enum';
class ConfigApp {
  config: object;
  constructor() {
    this.config = {};
  }

  loadConfig(configDir: string, env: EEnvironments) {
    this.mergeConfig(loadFile(`${configDir}/environments/all`));
    this.mergeConfig(loadFile(`${configDir}/environments/local`));
    this.mergeConfig(loadFile(`${configDir}/secrets/local`));
    return this.config;
  }

  mergeConfig(obj: object) {
    return _merge(this.config, obj);
  }
}

const loadFile = async (file: string) => {
  try {
    import(`${file}`);
  } catch (error) {
    console.log('file not found:', file);
  }
};
export default ConfigApp;
