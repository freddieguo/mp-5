import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI as string;

if (!uri) {
    throw new Error("Please add your Mongo URI to .env.local");
}

const client = new MongoClient(uri);
const clientPromise = client.connect();

export default clientPromise;
