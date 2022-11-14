import {
  IMPORT_MODULE,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_BASEURL,
  DATABASE_NAME,
} from '../../../configs/configs.js';

const {initMongoClient} = await IMPORT_MODULE('/src/utils/mongodb.js');

export default async function connectDatabase() {

  const db_url = `mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_BASEURL}/${DATABASE_NAME}?retryWrites=true&w=majority`;      //"mongodb://localhost:27017/";
  const db_options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

  const client = await initMongoClient(db_url, db_options);

  if (client){
    console.log('DATA BASE CONNECTED');
    return client;
  } else {
    console.log('DATA BASE NOT CONNECTED');
    return false;
  }

}
