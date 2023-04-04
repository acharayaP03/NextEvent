

import classes from './newsletter-registration.module.css';
import {useEffect, useRef} from "react";

function NewsletterRegistration() {
    const emailInputRef = useRef();

    async function registrationHandler(event) {
        event.preventDefault();

        // fetch user input (state or refs)
        // optional: validate input
        // send valid data to API

        await fetch('/api/newsletter', {
            method: 'POST',
            body: JSON.stringify({ email: emailInputRef.current.value }),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then( response => response.json())
            .then((data) => console.log(data))
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