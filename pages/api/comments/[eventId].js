import {router} from "next/client";

function handler (req, res) {
    const eventId = router.query.eventId;

    if(req.method === 'POST'){
        const { email, name, text } = req.body;

        if(!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === ''){
            res.status(422).json({ message: 'Invalid input'});
            return;
        }

        const newComments = {
            id: new Date().toISOString(),
            email, name, text
        }

        console.log(newComments)
        res.status(201).json({ message: 'Comment created', comment: newComments})
    }

    if(req.method === 'GET'){
        const dummy = [
            { id: 'c1', name: 'Trishten', text: 'My first comment.'},
            { id: 'c2', name: 'Prabhakar', text: 'My second comment'}
        ]

        res.status(200).json({ comments: dummy })
    }
}

export default handler;