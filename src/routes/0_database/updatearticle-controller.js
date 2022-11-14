import {
  IMPORT_MODULE
} from '../../configs/configs.js';

const updateObjInCollection = await IMPORT_MODULE('/src/routes/0_database/components/update-document-in-collection.js');

export default async function currentController(request, response) {

  if (!request.body){
    console.log(request);
    console.log('BODY NAO TA DEFINIDO');
    response.json({result: false});
    return;
  }

  const {
    article_id,
    article_title,
    article_content
  } = request.body;

  const addArticleObj = {
    article_id,
    article_title,
    article_content
  };

  const {client} = global;
  await updateObjInCollection(client, 'bia-data', 'articles', {'article_id': article_id}, addArticleObj);

  response.json(addArticleObj);

}
