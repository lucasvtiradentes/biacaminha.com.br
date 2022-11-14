// #####################################################################################################################
import mongodb from 'mongodb'

// #####################################################################################################################
export default {
  initMongoClient,

  selectDatabase,

  selectCollection,
  deleteCollection,

  showAllDocuments,
  findDocuments,
  findUniqueDocument,
  updateDocument,
  deleteDocument,
  addDocument,
  addMultipleDocument
}

// #####################################################################################################################

async function initMongoClient(db_url, db_options) { // ==============================================================
  // select or create an database
  try {
    const mongo = mongodb.MongoClient;
    return await mongo.connect(db_url, db_options);
  } catch (e) {
    return false;
  }
}


async function selectDatabase(client, db_name) { // ==================================================================
  try {
    return await client.db(db_name);
  } catch (e) {
    return false;
  }
}

async function selectCollection(db, collectionName) { // =============================================================
  try {
    return await db.collection(collectionName);
  } catch (e) {
    return false;
  }
}

async function deleteCollection(db, collectionName) { // =============================================================
  try {
    return await db.collection(collectionName).drop();
  } catch (e) {
    return false;
  }
}

async function showAllDocuments(collection) { // =====================================================================
  try {
    return await collection.find().toArray();
  } catch (e) {
    return false;
  }
}

async function findDocuments(collection, searchObject, opc_showOrHide) { // ==========================================
  // dbo.collection("customers").find({}, { projection: { _id: 0, name: 1, address: 1 }
  try {
    if (opc_showOrHide) {
      return await collection.find(searchObject, opc_showOrHide).toArray();
    } else {
      return await collection.find(searchObject).toArray();
    }
  } catch (e) {
    return false;
  }
}

async function findUniqueDocument(collection, searchObject) { // =====================================================
  try {
    return await collection.findOne(searchObject);
  } catch (e) {
    return false;
  }
}


async function updateDocument(collection, searchObject, replaceObject) { // ==========================================
  try {
    return await collection.updateOne(searchObject, { '$set': replaceObject });
  } catch (e) {
    return false;
  }
}

async function deleteDocument(collection, searchObject) { // =========================================================
  try {
    return await collection.deleteOne(searchObject);
  } catch (e) {
    return false;
  }
}

async function addDocument(collection, addObject) { // ===============================================================
  try {
    return await collection.insertOne(addObject);
  } catch (e) {
    return false;
  }
}

async function addMultipleDocument(collection, addObject) { // =======================================================
  try {
    return await collection.insertMany(addObject);
  } catch (e) {
    return false;
  }
}

// #####################################################################################################################
   // https://www.w3schools.com/nodejs/nodejs_mongodb.asp
   // https://flaviocopes.com/mongodb/
