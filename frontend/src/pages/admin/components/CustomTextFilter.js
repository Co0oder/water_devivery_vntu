import React, { useState } from "react";
import {Input, InputAdornment, InputLabel} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Search from "@material-ui/icons/SearchRounded";

const CustomDatePicker = ({props, label}) => {
    const [data, setData] = useState(null);

    return (
        <FormControl style={{width: '100%'}}>
            {/*<InputLabel id="demo-controlled-open-select-label">{label}</InputLabel>*/}
            <Input
                value={data}
                startAdornment={
                    <InputAdornment position="start">
                        <Search />
                    </InputAdornment>
                }
                onChange={(e) => {
                    setData(e.target.value)
                    props.onFilterChanged(props.columnDef.tableData.id, e.target.value);
                }}
            />
        </FormControl>
    )

};
export default CustomDatePicker;
