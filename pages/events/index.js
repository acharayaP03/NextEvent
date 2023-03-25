
import {getAllEvents} from "../../data";
import EventList from "../../components/events/EventList";
import {Fragment} from "react";
import EventsSearch from "../../components/events/events-search";
export default function AllEvents() {
	const items = getAllEvents();
	return (
		<div>
			<Fragment>
				<EventsSearch/>
				<EventList items={items}/>
			</Fragment>
		</div>
	);
}
