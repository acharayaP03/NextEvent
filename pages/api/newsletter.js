
import { MongoClient } from "mongodb";
async function connectDatabase(res) {
    try{
        return await MongoClient.connect('mongodb+srv://acharyap03:yA7Z8cyirFCyIuOx@cluster0.8hbzrjl.mongodb.net/events?retryWrites=true&w=majority')
    }catch (error){
        res.status(500).json({ message : 'Connection failed...'});
        return;
    }

}

async function createSubscription (client, document){
    const db = client.db();
    await db.collection('emails').insertOne(document);
}

export default async function handler(req, res){
    const client = await connectDatabase(res)

    if(req.method === 'POST'){
        const userEmail = req.body.email;

        if(!userEmail || !userEmail.includes('@')){
            res.status(422).json({
                message: 'Invalid email address.'
            });
            return;
        }

        try{
            await createSubscription(client, { email: userEmail });
            await client.close();

        }catch (error){
            res.status(500).json({ message: 'Email subscription failed.'})
            return
        }
        await client.close();

        res.status(201).json({ message: 'Successfully Subscribed'})
    }
}