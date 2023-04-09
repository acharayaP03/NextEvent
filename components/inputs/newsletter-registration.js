

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

        await fetch('/api/newsletter', {
            method: 'POST',
            body: JSON.stringify({ email: emailInputRef.current?.value }),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then( response => {
            if(response.ok){
                return response.json();
            }

            return response.json().then(data => {
                throw new Error(data.message || 'Something went wrong!')
            })
        })
            .then((data) => {
                notificationCtx.showNotification({
                    title: 'Success!',
                    message: 'Your email have been subscribed',
                    status: 'success'
                })
            }).catch( error => {
                notificationCtx.showNotification({
                    title: 'Error',
                    message: error.message || 'Something went wrong.',
                    status: 'error'
                })
            })
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