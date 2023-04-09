

import classes from './newsletter-registration.module.css';
import {useContext, useRef} from "react";
import NotificationContext from "../../store/notification-context";

function NewsletterRegistration() {
    const notificationCtx = useContext(NotificationContext)
    const emailInputRef = useRef();

    async function registrationHandler(event) {
        event.preventDefault();

        notificationCtx.showNotification({
            title: 'Signing up...',
            message: 'Registering for newsletter.',
            status: 'pending'
        })
        try{
            const response = await fetch('/api/newsletter', {
                method: 'POST',
                body: JSON.stringify({ email: emailInputRef.current?.value }),
                headers:{
                    'Content-Type': 'application/json'
                }
            });

            const results = await response.json();

            /**
             * this if check is needed if response fails so that error can make it to catch block.
             * or else the notification will show pending state, and we wont know what went wrong.
             */
            if(!response.ok){
                throw new Error(response.message || 'Something went wrong!')
            }
            notificationCtx.showNotification({
                title: 'Success!',
                message: 'Your email have been subscribed',
                status: 'success'
            })
            return results;

        }catch(error){
            notificationCtx.showNotification({
                title: 'Error',
                message: error.message || 'Something went wrong.',
                status: 'error'
            })
        }
    }



    return (
        <section className={classes.newsletter}>
            <h2>Sign up to stay updated!</h2>
            <form onSubmit={registrationHandler}>
                <div className={classes.control}>
                    <input
                        type='text'
                        id='email'
                        ref={emailInputRef}
                        placeholder='Your email'
                        aria-label='Your email'
                    />
                    <button>Register</button>
                </div>
            </form>
        </section>
    );
}

export default NewsletterRegistration;