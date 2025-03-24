// database/mongo.js
const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);

let db;

async function connectToMongo() {
  if (db) return db;
  await client.connect();
  db = client.db('rental');
  console.log(`✅ MongoDB connected to ${config.hostname}`);
  return db;
}

module.exports = { connectToMongo };
