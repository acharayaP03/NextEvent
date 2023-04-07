
import { MongoClient } from "mongodb";

export default async function handler (req, res) {
    const { eventId } = req.query;
    const client = await MongoClient.connect('mongodb+srv://acharyap03:yA7Z8cyirFCyIuOx@cluster0.8hbzrjl.mongodb.net/events?retryWrites=true&w=majority')

    if(req.method === 'POST'){
        const { email, name, text } = req.body;

        if(!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === ''){
            res.status(422).json({ message: 'Invalid input'});
            return;
        }

        const newComments = {
            email, name, text, eventId
        }

        const db = client.db();
        const result = await db.collection('comments').insertOne(newComments)

        newComments.id = result.insertedId

        res.status(201).json({ message: 'Comment created', comment: newComments})
    }

    if(req.method === 'GET'){
        const db = client.db();

        const documents = await db.collection('comments').find().sort({ _id: -1 }).toArray();
        res.status(200).json({ comments: documents })
    }

    await  client.close();
}
