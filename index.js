import { MongoClient, ObjectId } from 'mongodb';
import { mongoURI } from './secrets.js';
const dbName = "c11-practice";
const collectionName = "my-thrid";

/* Connect to the MongoDB cluster
*************************************** */
const mongoConnect = new MongoClient(mongoURI);
await mongoConnect.connect();
const db = mongoConnect.db(dbName);

/* CRUD: READ
*************************************** */
async function readAll() {
  const query = await db.collection(collectionName)
    .find( {} )
    .limit(10)
    .toArray();
  
  return query;
}

/* CRUD: DELETE
*************************************** */
async function deleteOne(id) {
  const query = await db.collection(collectionName)
    .deleteOne( { _id: new ObjectId(id) } );
  
  return query;
}

/* CRUD: INSERT 
*************************************** */
async function insertOne(document) {
  const query = await db.collection(collectionName)
    .insertOne(document);

  return query;
}

/* CRUD: UPDATE
*************************************** */
async function updateOne(id, document) {
  const query = await db.collection(collectionName)
    .updateOne( 
      { _id: new ObjectId(id) }, 
      { $set: document } 
    );
  
  return query;
}

/* RENDER
*************************************** */
// const result = await readAll();
// const result = await deleteOne("648b760af400755b5d3cd621");

// const dataDoc = { 
//   name: "new document11",
//   age: 200,
//   isAlive: false,
// };

// const result = await insertOne(dataDoc);

const dataDoc = {
  name: "green onion"
};

const result = await updateOne("648b760af400755b5d3cd61f", dataDoc);

console.log(result);



/* CLOSE
*************************************** */
mongoConnect.close();
