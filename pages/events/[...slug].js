
import { useRouter } from "next/router";
import {getFilteredEvents} from "../../data";
import EventList from "../../components/events/EventList";
import {Fragment} from "react";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/UI/button";
import ErrorAlert from "../../components/UI/error-alert";

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
		return <Fragment>
			<ErrorAlert>Invalid filter, please adjust your filter and proceed again.</ErrorAlert>
			<Button link='/events' className='center'>Show All Events</Button>
		</Fragment>
	}

	const filteredEvents = getFilteredEvents({
		year: filteredYear,
		month: filteredMonth
	})

	// check if the events are within the range
	if(!filteredEvents || filteredEvents.length === 0){
		return <Fragment>
			<ErrorAlert>No events found for the chosen filter!</ErrorAlert>
			<div className='center'>
				<Button link='/events' className='center'>Show All Events</Button>
			</div>
		</Fragment>
	}

	const date = new Date(filteredYear, filteredMonth)
	return (
		<Fragment>
			<ResultsTitle date={date}/>
			<EventList items={filteredEvents}/>
		</Fragment>
	);
}
