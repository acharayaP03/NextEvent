import {useContext, useEffect, useState} from 'react';

import CommentList from './comment-list';
import NewComment from './new-comments';
import classes from './comments.module.css';
import NotificationContext from "../../store/notification-context";


function Comments(props) {
    const { eventId } = props;
    const notificationCtx = useContext(NotificationContext);

    const [showComments, setShowComments] = useState(false);
    const [comments, setComments ] = useState([]);
    const [isFetchingComments, setIsFetchingComments ] = useState(false)

    useEffect( () => {
        if(showComments){
            setIsFetchingComments(true)
            fetch('/api/comments/' + eventId)
                .then( response => response.json())
                .then(data => {
                    setComments(data.comments)
                    setIsFetchingComments(false)
                })
        }
    }, [showComments])

    function toggleCommentsHandler() {
        setShowComments((prevStatus) => !prevStatus);
    }

    async function addCommentHandler(commentData) {

        notificationCtx.showNotification({
            title: 'Signing Sending comments',
            message: 'please wait when send your comment.',
            status: 'pending'
        })

        try{
            const request = await fetch('/api/comments/' + eventId , {
                method: 'POST',
                body: JSON.stringify(commentData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const comment = await request.json();

            if(!request.ok){
                throw new Error(request.message || 'Could not save your comment.')
            }
            notificationCtx.showNotification({
                title: 'Success!',
                message: 'Your comment has been saved.',
                status: 'success'
            })
            return comment
        }catch(error){
            console.error(error)
            notificationCtx.showNotification({
                title: 'Error',
                message: error.message || 'Comment save failed.',
                status: 'error'
            })
        }
    }

    return (
        <section className={classes.comments}>
            <button onClick={toggleCommentsHandler}>
                {showComments ? 'Hide' : 'Show'} Comments
            </button>
            {showComments && <NewComment onAddComment={addCommentHandler} />}
            {showComments && !isFetchingComments && <CommentList items={comments}/>}
            { showComments && isFetchingComments && <p>Loading....</p>}
        </section>
    );
}

export default Comments;
