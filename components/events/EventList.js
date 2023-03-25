import classes from "./event-list.module.css";

import EventItem from "./event-item";
const EventList = (props) =>{
    const { items } = props;
    return(
        <div className={classes.list}>
            { items.map((eventItems) => (
                <EventItem {...eventItems} key={eventItems.id}/>
            ))}
        </div>
    )
}

export default EventList;