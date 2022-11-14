import {
  IMPORT_MODULE
} from '../configs/configs.js';

import express from 'express';

const routes = express.Router();

routes.post('/addarticle', await IMPORT_MODULE('/src/routes/0_database/addarticle-controller.js'));
routes.post('/updatearticle', await IMPORT_MODULE('/src/routes/0_database/updatearticle-controller.js'));

routes.get('/update', await IMPORT_MODULE('/src/routes/0_database/update-controller.js'));
routes.get('/getinfo', await IMPORT_MODULE('/src/routes/0_database/getinfo-controller.js'));

routes.get('/admin', await IMPORT_MODULE('/src/routes/1_admin/admin-controller.js'));
routes.get('/', await IMPORT_MODULE('/src/routes/2_home/home-controller.js'));
routes.get('/quem_somos', await IMPORT_MODULE('/src/routes/3_quem_somos/quem_somos-controller.js'));
routes.get('/atuacao', await IMPORT_MODULE('/src/routes/4_atuacao/atuacao-controller.js'));

routes.get('/artigos', await IMPORT_MODULE('/src/routes/5_imprensa/artigos/artigos-controller.js'));
routes.get('/artigo/:art_id', await IMPORT_MODULE('/src/routes/5_imprensa/artigo/artigo-controller.js'));
routes.get('/namidia', await IMPORT_MODULE('/src/routes/5_imprensa/na_midia/na_midia-controller.js'));
routes.get('/galeria', await IMPORT_MODULE('/src/routes/5_imprensa/galeria/galeria-controller.js'));

routes.get('/gabinete', await IMPORT_MODULE('/src/routes/6_participe/gabinete_online/gabinete-controller.js'));
routes.get('/comotatuarua', await IMPORT_MODULE('/src/routes/6_participe/como_ta_a_tua_rua/comotatuarua-controller.js'));

routes.get('/etudopraontem', await IMPORT_MODULE('/src/routes/7_manifesto/manifesto-controller.js'));

export default routes;
