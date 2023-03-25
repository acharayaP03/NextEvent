import Head from 'next/head'
import Image from 'next/image'
import EventList from "../components/events/EventList";
import {getAllEvents} from "../data";

export default function Home() {
	const items = getAllEvents();
  return (
		<div>
			<Head>
				<title>Next meetup</title>
				<meta name="description" content="Next js meetup event lists" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<EventList items={items}/>
			</main>
		</div>
	);
}
