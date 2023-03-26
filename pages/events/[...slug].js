
import { useRouter } from "next/router";
import {getFilteredEvents} from "../../data";


import { EventList, ResultsTitle} from '../../components/events'
import { CustomButton, ErrorAlert } from '../../components/UI'


export default function FilteredEventPage() {
	const router = useRouter();
	const { slug } = router.query;

	// slug is filter query that is passed from either event page or main page eg: ["2011", "2"]
	if(!slug){
		return <p className="center">Loading data...., please wait.</p>
	}

	const filteredMonth = Number(slug[1])
	const filteredYear = Number(slug[0]);

	if(isNaN(filteredYear) || isNaN(filteredMonth) || filteredYear > 2030 || filteredYear < 2021 || filteredMonth > 12  ){
		return <>
			<ErrorAlert>Invalid filter, please adjust your filter and proceed again.</ErrorAlert>
			<CustomButton link='/events' className='center'>Show All Events</CustomButton>
		</>
	}

	const filteredEvents = getFilteredEvents({
		year: filteredYear,
		month: filteredMonth
	})

	// check if the events are within the range
	if(!filteredEvents || filteredEvents.length === 0){
		return <>
			<ErrorAlert>No events found for the chosen filter!</ErrorAlert>
			<div className='center'>
				<CustomButton link='/events'>Show All Events</CustomButton>
			</div>
		</>
	}

	const date = new Date(filteredYear, filteredMonth)
	return (
		<>
			<ResultsTitle date={date}/>
			<EventList items={filteredEvents}/>
		</>
	);
}
