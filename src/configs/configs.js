import dotenv from 'dotenv';
dotenv.config();

import { dirname } from 'path';
import { fileURLToPath } from 'url';

import DELAY from '../utils/delay.js';
import IMPORT_MODULE from '../utils/import-module.js';
import CURRENT_DATETIME from '../utils/get-current-date-time.js';
import ROOT_PATH from '../utils/get-path-from-root.js';

const {
  PORT,
  npm_package_version,
  DATABASE_BASEURL,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_NAME,
  DATABASE_NEWS_COLLECTION,
  DATABASE_GENERAL_COLLECTION,
  DATABASE_MANDATA_COLLECTION,
} = process.env;

const __DIRNAME = dirname(fileURLToPath(import.meta.url));
const VERSION = npm_package_version || '#';
const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const SERVER_PORT = PORT || 3000;
const SERVER_BASE = NODE_ENV === 'production' ? 'https://biacaminha.com.br' : `http://localhost:${SERVER_PORT}`;

export {
  DATABASE_BASEURL,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_NAME,
  DATABASE_NEWS_COLLECTION,
  DATABASE_GENERAL_COLLECTION,
  DATABASE_MANDATA_COLLECTION,

  __DIRNAME,
  VERSION,
  NODE_ENV,
  SERVER_PORT,
  SERVER_BASE,

  DELAY,
  CURRENT_DATETIME,
  ROOT_PATH,
  IMPORT_MODULE
};
