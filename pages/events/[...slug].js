import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from 'swr'

import { EventList, ResultsTitle} from '../../components/events'
import { CustomButton, ErrorAlert } from '../../components/UI'
import Head from "next/head";


export default function FilteredEventPage() {
	const [loadedEvents, setLoadedEvents] = useState([]);

	const router = useRouter();
	const { slug } = router.query;

	const fetcher = (...args) => fetch(...args).then(res => res.json())
	const { data, error, isLoading } = useSWR('https://next-project-2dfa5-default-rtdb.firebaseio.com/events.json', fetcher);

	const filteredYear = slug && Number(slug[0]); // check if slug exist first then access its index
	const filteredMonth = slug && Number(slug[1]);

	useEffect(() => {
		if(data){
			const events = [];

			//convert data comming from firebase to arrays.
			for( const key in data){
				events.push({
					id: key,
					...data[key]
				})
			}
			setLoadedEvents(events)
		}
	}, [data])

	let filteredEvents = loadedEvents.filter((event) => {
		const eventDate = new Date(event.date);
		return (
			eventDate.getFullYear() === filteredYear && eventDate.getMonth() === filteredMonth - 1
		);
	});

	/**
	 * Reusing Head to all components
	 */

	let pageHeader = (
		<Head>
			<title>{ filteredEvents.title }</title>
			<meta name="description" content={`All events for ${filteredYear}/${filteredMonth}`}/>
			<link rel="icon" href="/favicon.ico" />
		</Head>
	)

	// slug is filter query that is passed from either event page or main page eg: ["2011", "2"]
	if(!loadedEvents){
		return <>
			{ pageHeader }
			<p className="center">Loading data...., please wait.</p>
		</>
	}



	if(isNaN(filteredYear) || isNaN(filteredMonth) || filteredYear > 2030 || filteredYear < 2021 || filteredMonth > 12 || error){
		return <>
			{ pageHeader }
			<ErrorAlert>Invalid filter, please adjust your filter and proceed again.</ErrorAlert>
			<CustomButton link='/events' className='center'>Show All Events</CustomButton>
		</>
	}

	// check if the events are within the range
	if(!filteredEvents || filteredEvents.length === 0){
		return <>
			{ pageHeader }
			<ErrorAlert>No events found for the chosen filter!</ErrorAlert>
			<div className='center'>
				<CustomButton link='/events'>Show All Events</CustomButton>
			</div>
		</>
	}

	const date = new Date(filteredYear, filteredMonth - 1)
	return (
		<>
			{ pageHeader }
			<ResultsTitle date={date}/>
			<EventList items={filteredEvents}/>
		</>
	);
}
