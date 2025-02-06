const { MongoClient, ObjectId }  = require('mongodb');
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
            statusCode: 201,
            body: JSON.stringify({message: 'User inserted successfully', data: result})
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error inserting user', error: error })
        };
    }
}

exports.getHandler = async (event) => {
    const { id }    = event.pathParameters;
    if(!ObjectId.isValid(id)) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Invalid user id' })
        };
    }

    try {
        const db = await connectDB();
        const user = await db.collection('users').findOne({ _id: ObjectId(id) });
        if(!user) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'User not found' })
            };
        } 
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'User retrieved successfully', data: user })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving user', error: error })
        };
    }
}

exports.updateHandler = async (event) => {
    const { id } = event.pathParameters;
    const { user } = JSON.parse(event.body);
    if(!ObjectId.isValid(id)) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Invalid user id' })
        };
    }
     try {
        const db = await connectDB();
        const result = await db.collection('users').updateOne({ _id: ObjectId(id) }, { $set: user });
        if(result.modifiedCount === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'User not found' })
            };
        }
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'User updated successfully', data: result })
        };
     } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error updating user', error: error })
        };
     }
}

exports.deleteHandler = async (event) => {
    const { id } = event.pathParameters;
    if(!ObjectId.isValid(id)) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Invalid user id' })
        };
    }
    try {
        const db = await connectDB();
        const result = await db.collection('users').deleteOne({ _id: ObjectId(id) });
        if(result.deletedCount === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'User not found' })
            };
        }
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'User deleted successfully', data: result })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error deleting user', error: error })  
        }
    }
}

exports.listHandler = async (_event) => {
    try {
        const db = await connectDB();
        const users = await db.collection('users').find({}).toArray();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Users retrieved successfully', data: users })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving users', error: error })
        };
    }
}