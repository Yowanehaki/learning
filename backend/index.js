const { MongoClient } = require('mongodb');
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db("test");
    const result = await db.collection("users").insertOne({ nama: "Ani", umur: 22 });
    console.log("Data ditambahkan:", result.insertedId);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);