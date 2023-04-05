
export default function handler (req, res) {
    const { eventId } = req.query

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
        res.status(201).json({ message: 'Comment created', comment: newComments})
    }

    if(req.method === 'GET'){
        const dummy = [
            { id: 'c1', name: 'Trishten', text: 'Awesome event, I m excited to see how it folds..'},
            { id: 'c2', name: 'Prabhakar', text: 'Wow, excited to go to this event. Well done!!!'}
        ]

        res.status(200).json({ comments: dummy })
    }
}
