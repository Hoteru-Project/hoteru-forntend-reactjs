import React, {useEffect, useState} from 'react';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import {Grid} from "@material-ui/core";
import {useTranslation} from "react-i18next";

export default function CheckDate(props) {
    const [selectedDate, setSelectedDate] = useState(props.minDate);
    const handleDateChange = (date) => {
        date.setUTCHours(1, 0, 0, 0);
        let formattedDate = date.toISOString().split("T")[0]
        props.dateSetter(date)
        setSelectedDate(date);
        props.setcheckDate(formattedDate, props.type)
    };
    const {t} = useTranslation()

    useEffect(() => {
        if (props.minDate > selectedDate) {
            handleDateChange(props.minDate)
        }
    });

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div className="rounded-3">
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        label={props.type==="checkIn"?`${t("check_in")}`:`${t("check_out")}`}
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