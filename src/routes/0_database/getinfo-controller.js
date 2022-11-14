import {
  IMPORT_MODULE
} from '../../configs/configs.js';

const findObjInCollection = await IMPORT_MODULE('/src/routes/0_database/components/find-document-in-collection.js');

export default async function currentController(request, response) {

  const {mode} = request.query;

  console.log(mode);

  if (mode === 'numbers'){
    await getNumbers(request, response);
  } else if (mode === 'images'){
    await getImages(request, response);
  } else if (mode === 'forms'){
    await getForms(request, response);
  }

  if  (mode === 'news'){
    await getNews(request, response);
  } else if  (mode === 'lastnews'){
    await getLastNews(request, response);
  }

  if  (mode === 'mandata'){
    await getMandata(request, response);
  } else if (mode === 'mandata_category'){
    await getMandataOnlyCategory(request, response);
  } else if (mode === 'mandata_type'){
    await getMandataOnlyType(request, response);
  }

  if (mode === 'articles'){
    await getArticles(request, response);
  } else if (mode === 'article'){
    await getArticle(request, response);
  }

}

async function getNumbers(request, response){

  const {client} = global;
  const objArr = await findObjInCollection(client, 'bia-data', 'general', {name: 'numbers'});
  const numbersObj = objArr[0].values;

  response.json(numbersObj);
}

async function getForms(request, response){

  const {client} = global;
  const objArr = await findObjInCollection(client, 'bia-data', 'general', {name: 'forms'});
  const formsObj = objArr[0].values;

  response.json(formsObj);
}


async function getImages(request, response){

  const {client} = global;
  const objArr = await findObjInCollection(client, 'bia-data', 'general', {name: 'images'});
  const imagesObj = objArr[0].values;

  response.json(imagesObj);
}


async function getArticles(request, response){

  const {client} = global;
  const objArr = await findObjInCollection(client, 'bia-data', 'articles', {});

  response.json(objArr);
}

async function getArticle(request, response){

  const {id} = request.query;
  const {client} = global;

  const objArr = await findObjInCollection(client, 'bia-data', 'articles', {'article_id': id});

  response.json(objArr);
}

async function getNews(request, response){

  const {client} = global;
  const objArr = await findObjInCollection(client, 'bia-data', 'news', {});

  response.json(objArr);
}

async function getLastNews(request, response){

  const {client} = global;
  const objArr = await findObjInCollection(client, 'bia-data', 'news', {});

  const newsNumber = 3;
  const lastNews = objArr.slice(objArr.length - newsNumber);

  response.json(lastNews);
}


async function getMandata(request, response){

  const {client} = global;
  const objArr = await findObjInCollection(client, 'bia-data', 'mandata', {});

  response.json(objArr);
}

async function getMandataOnlyCategory(request, response){

  const {client} = global;
  const {category} = request.query;
  const objArr = await findObjInCollection(client, 'bia-data', 'mandata', {mandata_category: category});

  response.json(objArr);
}

async function getMandataOnlyType(request, response){

  const {client} = global;
  const {type} = request.query;
  const objArr = await findObjInCollection(client, 'bia-data', 'mandata', {mandata_type: type});

  response.json(objArr);
}
