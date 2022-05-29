import React, { useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import {InputLabel, Select} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Search from "@material-ui/icons/SearchRounded";

const CustomSelectFilter = ({props, title, options}) => {
    const [data, setData] = useState([]);

    return (
        <FormControl style={{width: '100%'}}>
            {/*<InputLabel id="demo-simple-select-label">{title}</InputLabel>*/}
            <Select
                labelId="demo-simple-select-label"
                multiple={true}
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
            >
                {
                    options.map(option => (
                        <MenuItem key={option.id} value={option.label}>{option.label}</MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    )

};
export default CustomSelectFilter;
