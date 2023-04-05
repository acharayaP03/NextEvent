import {useEffect, useState} from 'react';

import CommentList from './comment-list';
import NewComment from './new-comments';
import classes from './comments.module.css';


function Comments(props) {
    const { eventId } = props;

    const [showComments, setShowComments] = useState(false);
    const [comments, setComments ] = useState([]);

    useEffect( () => {
        if(showComments){
            fetch('/api/comments/' + eventId).then( response => response.json()).then(data => setComments(data.comments))
        }
    }, [showComments])

    function toggleCommentsHandler() {
        setShowComments((prevStatus) => !prevStatus);
    }

    async function addCommentHandler(commentData) {

        try{
            const request = await fetch('/api/comments/' + eventId , {
                method: 'POST',
                body: JSON.stringify(commentData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const comment = await request.json();
            return comment
        }catch(error){
            console.error(error)
        }
    }

    return (
        <section className={classes.comments}>
            <button onClick={toggleCommentsHandler}>
                {showComments ? 'Hide' : 'Show'} Comments
            </button>
            {showComments && <NewComment onAddComment={addCommentHandler} />}
            {showComments && <CommentList items={comments}/>}
        </section>
    );
}

export default Comments;
