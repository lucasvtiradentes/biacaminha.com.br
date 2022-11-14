import {
  IMPORT_MODULE
} from '../../configs/configs.js';

const findObjInCollection = await IMPORT_MODULE('/src/routes/0_database/components/find-document-in-collection.js');
const updateObjInCollection = await IMPORT_MODULE('/src/routes/0_database/components/update-document-in-collection.js');
const addObjInCollection = await IMPORT_MODULE('/src/routes/0_database/components/add-document-to-collection.js');
const delObjInCollection = await IMPORT_MODULE('/src/routes/0_database/components/delete-document-in-collection.js');

export default async function currentController(request, response) {

  const {mode} = request.query;

  console.log(mode);

  if  (mode === 'addnews'){
    await addNews(request, response);
  } else if  (mode === 'removenews'){
    await removeNews(request, response);
  } else if  (mode === 'updatenews'){
    await updateNews(request, response);
  }

  if  (mode === 'addmandata'){
    await addMandata(request, response);
  } else if  (mode === 'removemandata'){
    await removeMandata(request, response);
  } else if  (mode === 'updatemandata'){
    await updateMandata(request, response);
  }

  if (mode === 'forms'){
    await updateForms(request, response);
  }

  if (mode === 'numbers'){
    await updateNumbers(request, response);
  }

  if (mode === 'images'){
    await updateImages(request, response);
  }

  if (mode === 'removearticle'){
    await removeArticle(request, response);
  }

}

/* -------------------------------------------------------------------------- */

async function updateForms(request, response){

  const {
    gabinete_online,
    como_ta_tua_rua,
    manifesto
  } = request.query;

  const updatedForms = {
    gabinete_online,
    como_ta_tua_rua,
    manifesto
  };

  const {client} = global;
  const objArr = await findObjInCollection(client, 'bia-data', 'general', {name: 'forms'});
  const numbersObj = objArr[0];

  var updatedObj = numbersObj;
  updatedObj.values = updatedForms;
  await updateObjInCollection(client, 'bia-data', 'general', {name: 'forms'}, updatedObj);

  response.json(updatedObj);
}

async function updateNumbers(request, response){

  const {
    projetos_de_lei,
    requerimentos,
    oficios,
    sessoes_especiais
  } = request.query;

  const updatedNumbers = {
    projetos_de_lei,
    requerimentos,
    oficios,
    sessoes_especiais
  };

  const {client} = global;
  const objArr = await findObjInCollection(client, 'bia-data', 'general', {name: 'numbers'});
  const numbersObj = objArr[0];

  var updatedObj = numbersObj;
  updatedObj.values = updatedNumbers;
  await updateObjInCollection(client, 'bia-data', 'general', {name: 'numbers'}, updatedObj);

  response.json(updatedObj);
}

async function removeArticle(request, response){

  const {
    id
  } = request.query;

  const {client} = global;

  const result = await delObjInCollection(client, 'bia-data', 'articles', {article_id: id});

  response.json({response: result});
}


async function updateImages(request, response){

  const {
    imagem_inicial,
    imagem_quem_somos_1,
  } = request.query;

  const newHomeImages = imagem_inicial.split(',');

  const updatedImages = {
    imagem_inicial: newHomeImages,
    imagem_quem_somos_1,
  };

  const {client} = global;
  const objArr = await findObjInCollection(client, 'bia-data', 'general', {name: 'images'});
  const imagesObj = objArr[0];

  var updatedObj = imagesObj;
  updatedObj.values = updatedImages;
  await updateObjInCollection(client, 'bia-data', 'general', {name: 'images'}, updatedObj);

  response.json(updatedObj);
}

/* -------------------------------------------------------------------------- */

async function addNews(request, response){

  const {
    news_title,
    news_image,
    news_link,
    news_date,
    news_owner,
  } = request.query;

  const addNewsObj = {
    news_title,
    news_image,
    news_link,
    news_date,
    news_owner,
  };

  const {client} = global;

  await addObjInCollection(client, 'bia-data', 'news', addNewsObj);

  response.json(addNewsObj);
}

async function removeNews(request, response){

  const {
    news_link,
  } = request.query;

  const {client} = global;

  const delResponse = await delObjInCollection(client, 'bia-data', 'news', {news_link: news_link});

  response.json({response: delResponse});
}

async function updateNews(request, response){

  const {
    news_title,
    news_image,
    news_link,
    news_date,
    news_owner,
  } = request.query;

  const updateNewsObj = {
    news_title,
    news_image,
    news_link,
    news_date,
    news_owner,
  };

  const {client} = global;

  const objArr = await findObjInCollection(client, 'bia-data', 'news', {news_link: news_link});
  const newsObj = objArr[0];

  await updateObjInCollection(client, 'bia-data', 'news', {news_link: news_link}, updateNewsObj);
  response.json(newsObj);

}

/* -------------------------------------------------------------------------- */

async function addMandata(request, response){

  const {
    mandata_title,
    mandata_category,
    mandata_link,
    mandata_date,
    mandata_type
  } = request.query;

  const addMandataObj = {
    mandata_title,
    mandata_category,
    mandata_link,
    mandata_date,
    mandata_type
  };

  const {client} = global;

  await addObjInCollection(client, 'bia-data', 'mandata', addMandataObj);

  response.json(addMandataObj);
}


async function removeMandata(request, response){

  const {
    mandata_link,
  } = request.query;

  const {client} = global;

  const delResponse = await delObjInCollection(client, 'bia-data', 'mandata', {mandata_link: mandata_link});

  response.json({response: delResponse});
}

async function updateMandata(request, response){

  const {
    mandata_title,
    mandata_category,
    mandata_link,
    mandata_date,
    mandata_type
  } = request.query;

  const updateMandataObj = {
    mandata_title,
    mandata_category,
    mandata_link,
    mandata_date,
    mandata_type
  };

  const {client} = global;

  await updateObjInCollection(client, 'bia-data', 'mandata', {mandata_link: mandata_link}, updateMandataObj);
  response.json(updateMandataObj);

}
