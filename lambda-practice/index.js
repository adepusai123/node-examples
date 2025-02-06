const { MongoClient }  = require('mongodb');
const dotenv = require('dotenv');

dotenv.config(); // load environment variables from .env file

const mongoUri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

async function  connectDB() {
    const client = new MongoClient(mongoUri, { useUnifiedTopology: true, useNewUrlParser: true });
    await client.connect();
    return client.db(dbName);  // Use the database name
}

exports.insertHandler = async (event) => {
    const db = await connectDB();
    const collection = db.collection('users');
    // const users = await collection.find({}).toArray();
    const user = JSON.parse(event.body); // Parse the incoming request body "user to insert"

    try {
        const result = await collection.insertOne(user);
        return {
            statusCode: 200,
            body: JSON.stringify({message: 'User inserted successfully', data: result})
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error inserting user', error: error })
        };
    }
}