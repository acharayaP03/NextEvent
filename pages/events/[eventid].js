import { useRouter } from "next/router";
import {getEventById} from "../../data";

import { EventContent, EventLogistics, EventSummary } from '../../components/event-detail'

import {ErrorAlert} from "../../components/UI";

export default function EventDetailPage() {

	const router = useRouter();
	const { eventid } = router.query;
	const eventDetailsWithId = getEventById(eventid);

	if(!eventDetailsWithId){
		return <ErrorAlert>Sorry, couldn't find any event associated with that event id. </ErrorAlert>
	}

	return (
		<>
			<EventSummary title={eventDetailsWithId.title}/>
			<EventLogistics date={eventDetailsWithId.date} address={eventDetailsWithId.location} image={eventDetailsWithId.image} imageAlt={eventDetailsWithId.title}/>
			<EventContent>
				<p>{eventDetailsWithId.description}</p>
			</EventContent>
		</>
	);
}
