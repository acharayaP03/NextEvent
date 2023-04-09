import '../styles/globals.css'
import Layout from "../components/layouts/layout";
import Head from "next/head";

import {NotificationContextProvider} from "../store/notification-context";



function MyApp({ Component, pageProps }) {
        return (
            <NotificationContextProvider>
                <Layout>
                    <Head>
                        <title>Next Events</title>
                        <meta name="description" content="Next js meetup"/>
                        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                    </Head>
                    <Component {...pageProps} />
                </Layout>
            </NotificationContextProvider>
        )
}

export default MyApp
