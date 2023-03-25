
import {getAllEvents} from "../../data";
import EventList from "../../components/events/EventList";
export default function AllEvents() {
	const items = getAllEvents();
	return (
		<div>
			<EventList items={items}/>
		</div>
	);
}
