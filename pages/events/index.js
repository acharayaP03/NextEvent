
import {getAllEvents} from "../../data";
import EventList from "../../components/events/EventList";
import {Fragment} from "react";
import EventsSearch from "../../components/events/events-search";
import {useRouter} from "next/router";
export default function AllEvents() {
	const items = getAllEvents();
	const router = useRouter();

	const findEventsHandler = (year, month) =>{
		const fullPath = `/events/${year}/${month}`

		router.push(fullPath)
	}
	return (
		<div>
			<Fragment>
				<EventsSearch onSearch={findEventsHandler}/>
				<EventList items={items}/>
			</Fragment>
		</div>
	);
}
