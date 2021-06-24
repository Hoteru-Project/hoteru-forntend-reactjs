import React, {useEffect, useState} from 'react';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import {Grid} from "@material-ui/core";

// const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
// const maxDate = new Date(today.getFullYear(), today.getMonth()+4, 0);

// minDate.setDate(minDate.getDate());
// maxDate.setMonth(maxDate.getMonth() + 3);

export default function CheckDate(props) {
    const [selectedDate, setSelectedDate] = useState(props.minDate);
    const handleDateChange = (date) => {
        date.setUTCHours(1, 0, 0, 0);
        let formattedDate = date.toISOString().split("T")[0]
        console.log("I AM DATE ",date.toISOString().split("T")[0])
        props.dateSetter(date)
        setSelectedDate(date);
        props.setcheckDate(formattedDate, props.type)
    };

    useEffect(() => {
        if (props.minDate > selectedDate) {
            handleDateChange(props.minDate)
        }
    });

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div className="bg-light p-2 w-25 rounded-3">
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        label={props.type==="checkIn"?"check-In":"check-Out"}
                        minDate={props.minDate}
                        maxDate={props.maxDate}
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid>
            </div>
        </MuiPickersUtilsProvider>
    );
}