import {
  IMPORT_MODULE
} from '../../../configs/configs.js';

const { selectDatabase, selectCollection, findDocuments } = await IMPORT_MODULE('/src/utils/mongodb.js');

export default async function findObjInCollection(dbClient, dbName, collection, objToSearch) {

  try {
    const db = await selectDatabase(dbClient, dbName);
    const col = await selectCollection(db, collection);

    const findObj = await findDocuments(col, objToSearch);

    if (findObj.length > 0) {
      return findObj;
    } else {
      return false;
    }

  } catch (error) {
    return false;
  }

}

