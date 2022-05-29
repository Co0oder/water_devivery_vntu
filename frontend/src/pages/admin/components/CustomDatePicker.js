import "date-fns";
import React from "react";
import DateFnsUtils from "@material-ui/pickers/adapter/date-fns"
import TextField from "@material-ui/core/TextField";
import {
    DateRangePicker,
    LocalizationProvider
} from "@material-ui/pickers";


export default function BasicDateRangePicker(props) {
    const [selectedDate, handleDateChange] = React.useState([null, null]);

    return (
        <LocalizationProvider dateAdapter={DateFnsUtils}>
            <DateRangePicker
                startText="Початок"
                endText="Кінець"
                value={selectedDate}
                onChange={date => {
                    handleDateChange(date)
                    props.onFilterChanged(props.columnDef.tableData.id, date)
                }}
                renderInput={(startProps, endProps) => {
                    delete startProps.variant
                    delete endProps.variant
                    return (
                        <>
                            <TextField {...startProps} />
                            &nbsp;-&nbsp;&nbsp;
                            <TextField {...endProps} />
                        </>
                    )
                }}
            />
        </LocalizationProvider>
    );
}
