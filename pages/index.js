import Head from 'next/head'
import {useRouter} from "next/router";

import {EventList, EventsSearch} from "../components/events";
import {getAllEvents} from "../data";


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
