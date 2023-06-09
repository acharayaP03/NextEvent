export async function getAllEvents () {
    try{
        const response = await fetch(process.env.FIREBASE_URI);
        const data = await response.json();

        if(!data){
            return new Error('Encountered issue while fetching data.')
        }

        const events = [];

        //convert data comming from firebase to arrays.
        for( const key in data){
            events.push({
                id: key,
                ...data[key]
            })
        }

        return events;
    }catch(e){
        console.log(e)
    }
}

export async function getFeaturedEvents(){
    const allEvents = await getAllEvents();
    return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id){
    const allEvents = await getAllEvents();
    return allEvents.find((events) => events.id === id )
}

export async function getFilteredEvents(dateFilter) {
    const { year, month } = dateFilter;
    const allEvents = await getAllEvents();

    let filteredEvents = allEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return (
            eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
        );
    });

    return filteredEvents;
}