
import {useRouter} from "next/router";
import {getAllEvents} from "../../data";

import {EventList, EventsSearch} from "../../components/events";


export default function AllEvents() {
	const items = getAllEvents();
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
