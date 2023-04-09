
import { MongoClient } from "mongodb";
export async function connectDatabase(res) {
    try{
        const connection = await MongoClient.connect(process.env.MONGODB_URI);
        return connection
    }catch (error){
        res.status(500).json({ message : 'Connection failed...'});
        return;
    }

}

export async function create (client, dbCollection, document){
    const db = client.db();
    return await db.collection(dbCollection).insertOne(document);
}

export async function getDocuments ( client, dbCollection, sort, filter ={} ){
    const db = client.db();

    const documents = await db.collection(dbCollection).find(filter).sort(sort).toArray();

    return documents
}
