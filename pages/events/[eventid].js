
import { getAllEvents, getEventById} from "../../helpers/api-utils";

import { EventContent, EventLogistics, EventSummary } from '../../components/event-detail'

import {ErrorAlert} from "../../components/UI";

export default function EventDetailPage(props) {
	const eventDetailsWithId = props.selectedEventWithId;

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

export async function getStaticPaths(){
	const events = await getAllEvents();

	const paths = events.map( event => ({ params : { eventid: event.id }}));
	return {
		paths,
		fallback: false
	}
}

export async function getStaticProps (context) {
	const eventId = context.params.eventid;

	const selectedEventWithId = await getEventById(eventId)

	return{
		props:{
			selectedEventWithId
		}
	}
}
