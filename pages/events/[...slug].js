
import { useRouter } from "next/router";
import {getFilteredEvents} from "../../helpers/api-utils";


import { EventList, ResultsTitle} from '../../components/events'
import { CustomButton, ErrorAlert } from '../../components/UI'


export default function FilteredEventPage(props) {
	// const router = useRouter();
	// const { slug } = router.query;

	// // slug is filter query that is passed from either event page or main page eg: ["2011", "2"]
	// if(!slug){
	// 	return <p className="center">Loading data...., please wait.</p>
	// }
	//
	// const filteredMonth = Number(slug[1])
	// const filteredYear = Number(slug[0]);

	if(props.hasError){
		return <>
			<ErrorAlert>Invalid filter, please adjust your filter and proceed again.</ErrorAlert>
			<CustomButton link='/events' className='center'>Show All Events</CustomButton>
		</>
	}

	const filteredEvents = props.filteredEvents;

	// check if the events are within the range
	if(!filteredEvents || filteredEvents.length === 0){
		return <>
			<ErrorAlert>No events found for the chosen filter!</ErrorAlert>
			<div className='center'>
				<CustomButton link='/events'>Show All Events</CustomButton>
			</div>
		</>
	}

	const date = new Date(props.date.year, props.date.month - 1)
	return (
		<>
			<ResultsTitle date={date}/>
			<EventList items={filteredEvents}/>
		</>
	);
}

export async function getServerSideProps(context){
	const { slug } = context.params;

	const filteredMonth = Number(slug[1])
	const filteredYear = Number(slug[0]);

	if(isNaN(filteredYear) || isNaN(filteredMonth) || filteredYear > 2030 || filteredYear < 2021 || filteredMonth > 12  ){
		return {
			props: {
				hasError: true
			},
			// notFound: true,
			// redirect: {
			// 	destination: '/error'
			// }
		}
	}
	const filteredEvents = await getFilteredEvents({
		year: filteredYear,
		month: filteredMonth
	})

	return {
		props: {
			filteredEvents,
			date: {
				year: filteredYear,
				month: filteredMonth
			}
		}
	}

}
