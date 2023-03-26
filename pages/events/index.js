
import {useRouter} from "next/router";
import {getAllEvents} from "../../helpers/api-utils";

import {EventList, EventsSearch} from "../../components/events";


export default function AllEvents(props) {
	const items = props.allEvents;
	const router = useRouter();

	const findEventsHandler = (year, month) =>{
		const fullPath = `/events/${year}/${month}`

		router.push(fullPath)
	}
	return (
		<div>
			<>
				<EventsSearch onSearch={findEventsHandler}/>
				<EventList items={items}/>
			</>
		</div>
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

