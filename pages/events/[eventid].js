
import { getFeaturedEvents, getEventById} from "../../helpers/api-utils";

import { EventContent, EventLogistics, EventSummary } from '../../components/event-detail'

import {ErrorAlert} from "../../components/UI";

export default function EventDetailPage(props) {
	const eventDetailsWithId = props.selectedEventWithId;

	if(!eventDetailsWithId){
		return <div className='center'>
			<p>Loading, please wait...</p>
		</div>
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
	const events = await getFeaturedEvents();

	const paths = events.map( event => ({ params : { eventid: event.id }}));
	return {
		paths,
		fallback: 'blocking'
	}
}

export async function getStaticProps (context) {
	const eventId = context.params.eventid;

	const selectedEventWithId = await getEventById(eventId)

	return{
		props:{
			selectedEventWithId
		},
		revalidate: 30
	}
}
