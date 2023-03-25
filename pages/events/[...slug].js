
import { useRouter } from "next/router";
import {getFilteredEvents} from "../../data";

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
		return <p>Invalid filter, please adjust your filter and proceed again.</p>
	}

	const filteredEvents = getFilteredEvents({
		year: filteredYear,
		month: filteredMonth
	})

	// check if the events are within the range
	if(!filteredEvents || filteredEvents.length === 0){
		return <p>No events found for the chosen filter!</p>
	}



	console.log(filteredYear,filteredMonth)
	return (
		<div>
			<h1>FilteredEventPage</h1>
		</div>
	);
}
