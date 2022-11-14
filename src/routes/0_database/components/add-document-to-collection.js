import {
  IMPORT_MODULE,
} from '../../../configs/configs.js';

const {
  selectDatabase,
  selectCollection,
  addDocument
} = await IMPORT_MODULE('/src/utils/mongodb.js');

export default async function AddObjToCollection(dbClient, dbName, collection, objToSend, hideMessage) {

  try {
    const db = await selectDatabase(dbClient, dbName);
    const col = await selectCollection(db, collection);
    const addedDocument = await addDocument(col, objToSend);

    if (addedDocument) {
      if (!hideMessage) {console.log('Documento enviado com sucesso');}
      return true;
    } else {
      if (!hideMessage) {console.log('Erro ao enviar documento');}
      return false;
    }

  } catch (error) {
    if (!hideMessage) {console.log(`${error.message}`);}
    return false;
  }

}

