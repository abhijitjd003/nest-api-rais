import * as yaml from 'js-yaml';
import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Create a file named defaultProfile for your own environment configuration
 */
let defaultProfile = '';
try {
  defaultProfile = readFileSync(join(__dirname, "defaultProfile"), 'utf8');
} catch (err) {
  //ignore silently
}
let YAML_CONFIG_FILENAME = defaultProfile ? `${defaultProfile}.yaml` : 'development.yaml';
if (process.env.MEMBERCENTRAL_ENV === 'staging') {
  YAML_CONFIG_FILENAME = 'staging.yaml';
} else if (process.env.MEMBERCENTRAL_ENV === 'uat') {
  YAML_CONFIG_FILENAME = 'uat.yaml';
} else if (process.env.MEMBERCENTRAL_ENV === 'production') {
  YAML_CONFIG_FILENAME = 'production.yaml';
}

console.log("MemberCentral Core API loading environment file: " + YAML_CONFIG_FILENAME);

export default () => {
  return yaml.load(
    readFileSync(join(__dirname, YAML_CONFIG_FILENAME), 'utf8'),
  ) as Record<string, any>;
};
