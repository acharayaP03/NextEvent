import { create, connectDatabase } from "./helpers";

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
            await create(client, 'emails',{ email: userEmail });
            await client.close();

        }catch (error){
            res.status(500).json({ message: 'Email subscription failed.'})
            return
        }
        await client.close();

        res.status(201).json({ message: 'Successfully Subscribed'})
    }
}