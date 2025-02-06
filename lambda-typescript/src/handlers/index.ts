import { MongoClient, ObjectId } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

const mongoUri: string = process.env.MONGO_URI || '';
const dbName: string = process.env.DB_NAME || '';

let db: MongoClient | null = null;
let collection: any;

async function connectToMongo() {
    const client = new MongoClient(mongoUri);
    await client.connect();
    db = await client.connect();
    collection = db.db(dbName).collection('users'); // change this to your collection name
    return db
}

export const createHandler = async (event: any) => {
    const { user } = JSON.parse(event.body);
    // do some validation here if needed
    try {
        const db = await connectToMongo();
        const result = await collection.insertOne(user);
        return {
            statusCode: 201,
            message: 'User created successfully',
            body: JSON.stringify(result)
        }
    } catch (error) {
        return {
            statusCode: 500,
            message: 'Failed to create user',
            body: JSON.stringify(error)
        }
    }
}

export const getHandler = async (event: any) => {
    try {
        const { id } = event.pathParameters;
        if (!ObjectId.isValid(id)) {
            return {
                statusCode: 400,
                message: 'Invalid user id',
                body: JSON.stringify({})
            }
        }
        const db = await connectToMongo();
        const result = await collection.find().toArray();
        return {
            statusCode: 200,
            message: 'Users fetched successfully',
            body: JSON.stringify(result)
        }
    } catch (error) {
        return {
            statusCode: 500,
            message: 'Failed to fetch users',
            body: JSON.stringify(error)
        }
    }
}
