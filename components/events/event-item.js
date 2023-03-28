import classes from './event-items.module.css'
import CustomButton from "../UI/customButton";
import {AddressIcon, ArrowRightIcon, DateIcon} from "../icons";
import Image from "next/image";


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
            <Image src={'/' + image} alt={title} width={250} height={160}/>
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