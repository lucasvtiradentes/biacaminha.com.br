import {
  ROOT_PATH,
  IMPORT_MODULE
} from '../../../configs/configs.js'

import express from 'express'

const routes = express.Router();
const homePageController = await IMPORT_MODULE('/src/routes/pages/homepageController.js')

routes.get("/", homePageController)

export default routes;