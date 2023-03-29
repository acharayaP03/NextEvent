import Head from 'next/head'

import {EventList} from "../components/events";
import {getFeaturedEvents} from "../helpers/api-utils";
import NewsletterRegistration from "../components/inputs/newsletter-registration";


export default function Home(props) {
  return (
		<div>
			<Head>
				<title>Next meetup</title>
				<meta name="description" content="Next js meetup event lists" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<NewsletterRegistration/>
				<EventList items={props.featuredEvents}/>
			</main>
		</div>
	);
}

export async function getStaticProps() {
	const featuredEvents = await getFeaturedEvents();
	
	return {
		props:{
			featuredEvents
		},
		revalidate: 1800
	}
}
