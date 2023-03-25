import Head from 'next/head'
import Image from 'next/image'
import EventList from "../components/events/EventList";
import {getAllEvents} from "../data";
import EventsSearch from "../components/events/events-search";
import {useRouter} from "next/router";

export default function Home() {
	const items = getAllEvents();
	const router = useRouter();

	const findEventsHandler = (year, month) =>{
		const fullPath = `/events/${year}/${month}`

		router.push(fullPath)
	}
  return (
		<div>
			<Head>
				<title>Next meetup</title>
				<meta name="description" content="Next js meetup event lists" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<EventsSearch onSearch={findEventsHandler}/>
				<EventList items={items}/>
			</main>
		</div>
	);
}
