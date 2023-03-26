export async function getAllEvents () {
    try{
        const response = await fetch('https://next-project-2dfa5-default-rtdb.firebaseio.com/events.json');
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