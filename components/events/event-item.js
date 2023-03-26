import classes from './event-items.module.css'
import CustomButton from "../UI/customButton";
import {AddressIcon, ArrowRightIcon, DateIcon} from "../icons";



export default function EventItem({id, title, image, date, location }){
    const formatDate = new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    const formatLocation = location.replace(', ', '\n');
    const exploreLink = `/events/${id}`
    return(
        <li className={classes.item}>
            <img src={'/' + image} alt={title}/>
            <div className={classes.content}>
                <div className={classes.summary}>
                    <h2>{title}</h2>
                    <div className={classes.date}>
                        <DateIcon/>
                        <time>{ formatDate}</time>
                    </div>
                    <div className={classes.address}>
                        <AddressIcon/>
                        <address>{formatLocation}</address>
                    </div>
                </div>
                <div className={classes.actions}>
                    <CustomButton link={exploreLink}><span>Explore events</span><span className={classes.icon}><ArrowRightIcon/></span></CustomButton>
                </div>
            </div>
        </li>
    )
}