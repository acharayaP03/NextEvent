import {connectDatabase, create, getDocuments} from "../helpers";
import {apiError} from "../helpers/apiError";

export default async function handler (req, res) {
    const { eventId } = req.query;
    const client = await connectDatabase();

    if(req.method === 'POST'){
        const { email, name, text } = req.body;

        if(!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === ''){

            apiError(res, 422, 'Invalid input provided.')

            await client.close();
            return;
        }

        const newComments = {
            email, name, text, eventId
        }

        try{
            const result = await create(client, 'comments', newComments);
            newComments.id = result.insertedId

            return res.status(201).json({ message: 'Comment created', comment: newComments});

        }catch(error){
            res.status(500).json({ message: 'Create comment failed.'})
        }

        await client.close();

    }

    if(req.method === 'GET'){

        const documents = await getDocuments(client, 'comments', { _id: -1 }, { eventId })
        res.status(200).json({ comments: documents })
    }

    await  client.close();
}
