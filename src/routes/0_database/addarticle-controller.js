import {
  IMPORT_MODULE
} from '../../configs/configs.js';

const addObjInCollection = await IMPORT_MODULE('/src/routes/0_database/components/add-document-to-collection.js');

export default async function currentController(request, response) {

  if (!request.body){
    console.log(request);
    console.log('BODY NAO TA DEFINIDO');
    response.json({result: false});
    return;
  }

  console.log(request.body);

  const {
    article_title,
    article_content
  } = request.body;

  const article_id = generateRandons(5);

  const addArticleObj = {
    article_id,
    article_title,
    article_content
  };

  const {client} = global;

  await addObjInCollection(client, 'bia-data', 'articles', addArticleObj);

  response.json(addArticleObj);

}


function generateRandons(n){

  let final;

  function generateRandomInteger(max) {
    return Math.floor(Math.random() * max) + 1;
  }

  for (let x = 0; x < n; x++) {
    final = final ? `${final}${generateRandomInteger(9)}` : generateRandomInteger(9);
  }

  return final;
}
