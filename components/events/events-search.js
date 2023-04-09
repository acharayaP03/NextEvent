import {CustomButton} from "../UI";
import classes from "./events-search.module.css"
import {useRef} from "react";
export default function EventsSearch(props){
    const monthArr = ['January', 'February', "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const yearInputRef = useRef();
    const monthInputRef = useRef();

    const submitHandler = (e) => {
        e.preventDefault();
        const selectedYear = yearInputRef.current.value;
        const selectedMonth = monthInputRef.current.value;

        props.onSearch(selectedYear, selectedMonth);
    }

    return(
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.controls}>
                <div className={classes.control}>
                    <label htmlFor="year">Year</label>
                    <select id="year" ref={yearInputRef}>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                    </select>
                </div>
                <div className={classes.control}>
                    <label htmlFor="month">Month</label>
                    <select id="month" ref={monthInputRef}>

                        { monthArr.map((month, index) => (
                            <option value={index + 1 } key={month}>{month}</option>
                        ))}
                    </select>
                </div>
            </div>
            <CustomButton>Find Events</CustomButton>
        </form>
    )
}