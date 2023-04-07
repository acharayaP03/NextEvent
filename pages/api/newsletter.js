
import { MongoClient } from "mongodb";

export default async function handler(req, res){

    if(req.method === 'POST'){
        const userEmail = req.body.email;

        if(!userEmail || !userEmail.includes('@')){
            res.status(422).json({
                message: 'Invalid email address.'
            });
            return;
        }

       const client =  await  MongoClient.connect(
            'mongodb+srv://acharyap03:yA7Z8cyirFCyIuOx@cluster0.8hbzrjl.mongodb.net/newsletter?retryWrites=true&w=majority'
        );
        const db = client.db();
        await db.collection('emails').insertOne({ email: userEmail });

        await client.close();

        res.status(201).json({ message: 'Successfully Subscribed'})
    }
}