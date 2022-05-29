import "date-fns";
import ruLocale from "date-fns/locale/uk";
import React from "react";
import DateFnsUtils from "@material-ui/pickers/adapter/date-fns"
import TextField from "@material-ui/core/TextField";
import {
    DatePicker,
    LocalizationProvider
} from "@material-ui/pickers";

import {getDeliveryDateOptions} from "../../../helpers/fromDataHelper";

export default function BasicDateRangePicker({onDataChange, value}) {
    const availableDate = getDeliveryDateOptions().map(date => new Date(date.value))

    return (
        <LocalizationProvider dateAdapter={DateFnsUtils} locale={ruLocale}>
            <DatePicker
                value={value}
                mask="__.__.____"
                shouldDisableDate={(data) => {
                    const date = new Date(data)
                    return !availableDate.find(item => item.getTime() === date.getTime())
                }}
                onChange={date => onDataChange(date)}
                renderInput={(startProps) => {
                    return (
                        <>
                            <TextField {...startProps} />
                        </>
                    )
                }}
            />
        </LocalizationProvider>
    );
}
