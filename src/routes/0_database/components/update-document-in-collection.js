import { IMPORT_MODULE } from '../../../configs/configs.js';
const {selectDatabase, selectCollection, updateDocument} = await IMPORT_MODULE('/src/utils/mongodb.js');

export default async function updateObjInCollection(dbClient, dbName, collection, objToSearch, newObj) {

  try {
    const db = await selectDatabase(dbClient, dbName);
    const col = await selectCollection(db, collection);

    const updateObjResponse = await updateDocument(col, objToSearch, newObj);

    if (updateObjResponse) {
      return true;
    } else {
      return false;
    }

  } catch (error) {
    return false;
  }

}

