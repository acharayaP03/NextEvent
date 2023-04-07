import '../styles/globals.css'
import Layout from "../components/layouts/layout";
import Head from "next/head";
import Notification from "../components/notification/notification";

function MyApp({ Component, pageProps }) {
  return (
      <Layout>
          <Head>
              <title>Next Events</title>
              <meta name="description" content="Next js meetup"/>
              <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
          </Head>
        <Component {...pageProps} />
        <Notification title="test" message="This is a test" status="error"/>
      </Layout>
  )
}

export default MyApp
