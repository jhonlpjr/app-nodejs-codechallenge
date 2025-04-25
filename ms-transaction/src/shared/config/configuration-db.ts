import { ENVIRONMENT } from '../utils/enums/environment.enum';
import { IConfigurationDB } from './configuration-db.interface';

export const configurationDB: any = (dialect: string) => {
  return {
    dialect,
    host: process.env[ENVIRONMENT.VARIABLE.BD_HOST],
    database: process.env[ENVIRONMENT.VARIABLE.BD_NAME],
    port: process.env[ENVIRONMENT.VARIABLE.BD_PORT],
    username: process.env[ENVIRONMENT.VARIABLE.BD_USERNAME],
    password: process.env[ENVIRONMENT.VARIABLE.BD_PASSWORD],
  } as IConfigurationDB;
};
