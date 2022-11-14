import { IMPORT_MODULE
} from '../../../configs/configs.js';

const {selectDatabase, selectCollection, findDocuments, deleteDocument} = await IMPORT_MODULE('/src/utils/mongodb.js');

export default async function deleteObjInCollection(dbClient, dbName, collection, objToSearch) {

  try {
    const db = await selectDatabase(dbClient, dbName);
    const col = await selectCollection(db, collection);

    const findObj = await findDocuments(col, objToSearch);

    if (findObj.length > 0) {
      return await deleteDocument(col, objToSearch);
    } else {
      return false;
    }

  } catch (error) {
    return false;
  }

}

