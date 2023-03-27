
import {useRouter} from "next/router";
import {getAllEvents} from "../../helpers/api-utils";

import {EventList, EventsSearch} from "../../components/events";
import Head from "next/head";


export default function AllEvents(props) {
	const items = props.allEvents;
	const router = useRouter();

	const findEventsHandler = (year, month) =>{
		const fullPath = `/events/${year}/${month}`

		router.push(fullPath)
	}
	return (
		<>
			<Head>
				<title>Browse all events</title>
				<meta name="description" content="All next js events listing. Pick and choose your favorite." />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<EventsSearch onSearch={findEventsHandler}/>
			<EventList items={items}/>
		</>

	);
}


export async function getStaticProps (){

	const allEvents = await getAllEvents();
	return{
		props: {
			allEvents
		},
		revalidate: 60
	}
}

