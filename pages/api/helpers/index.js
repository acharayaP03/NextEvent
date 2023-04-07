
import { MongoClient } from "mongodb";
export async function connectDatabase(res) {
    try{
        const connection = await MongoClient.connect('mongodb+srv://acharyap03:yA7Z8cyirFCyIuOx@cluster0.8hbzrjl.mongodb.net/events?retryWrites=true&w=majority');
        return connection
    }catch (error){
        res.status(500).json({ message : 'Connection failed...'});
        return;
    }

}

export async function create (client, dbCollection, document){
    const db = client.db();
    console.log('Document: ', document)
    return await db.collection(dbCollection).insertOne(document);
}

export async function getDocuments ( client, dbCollection, sort, filter ={} ){
    const db = client.db();

    const documents = await db.collection(dbCollection).find(filter).sort(sort).toArray();

    return documents
}
