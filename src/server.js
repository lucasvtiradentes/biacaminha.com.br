import express from 'express';

import {
  SERVER_PORT,
  ROOT_PATH
} from './configs/configs.js';

import connectDatabase from './routes/0_database/components/connect-database.js';
import allRoutes from './routes/routes.js';


const server = express();
const client = await connectDatabase();
global.client = client;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.set('etag', false);

server.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

server.set('view engine', 'ejs');
server.use('/assets', express.static(ROOT_PATH('/src/assets/')));
server.use('/routes', express.static(ROOT_PATH('/src/routes/')));
server.use('/', allRoutes);

server.listen(SERVER_PORT, async () => {
  console.log(`SERVER STARTED AT PORT ${SERVER_PORT}`);
}).setTimeout(0);
