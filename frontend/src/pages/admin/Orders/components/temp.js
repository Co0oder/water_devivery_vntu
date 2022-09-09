import React, { useState, useEffect } from 'react';
import { forwardRef } from 'react';
import Avatar from 'react-avatar';
import Grid from '@material-ui/core/Grid'

import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Alert from '@material-ui/lab/Alert';
import {Input, ListItem, ListItemText, Select, TextField} from "@material-ui/core";
import {getDeliveryDateOptions} from "../../../../helpers/fromDataHelper";
import MenuItem from "@material-ui/core/MenuItem";
import MaskedInput from "react-input-mask";
import clsx from "clsx";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import {i18n, keys} from "../../../../i18n";
import {DELIVERY_TIME_OPTIONS} from "../../../../constants/form";
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const DISTRICTS = [
    {
        id: 1,
        label: i18n.t(keys.districts.starogorodskoy),
    },
    {
        id: 2,
        label: i18n.t(keys.districts.vishenka),
    },
    {
        id: 3,
        label: i18n.t(keys.districts.zamostyanskiy),
    },
    {
        id: 4,
        label: i18n.t(keys.districts.drugoy),
    },
]

const api = {}


function validateEmail(email){
    const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
    return re.test(String(email).toLowerCase());
}

function TextMaskCustom(props) {
    const {inputRef, ...other} = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask="+380(99)-999-9999"
            placeholder="+380(__)-___-____"
        />
    )
};

const useStyles = makeStyles((theme) => ({
    field: {
        width: '100%'
    }
}));

function App({data}) {
    const classes = useStyles();

    // var columns = [
    //     {title: "id", field: "id", hidden: true},
    //     {title: "Avatar", render: rowData => <Avatar maxInitials={1} size={40} round={true} name={rowData === undefined ? " " : rowData.first_name} />  },
    //     {title: "First name", field: "first_name"},
    //     {title: "Last name", field: "last_name"},
    //     {title: "email", field: "email"}
    // ]
    const columns = [
        {
            field: 'name',
            title: 'Ім\'я',
            editComponent: props => {
                return (
                <FormControl className={classes.field}>
                    <Input
                        value={props.value}
                        error={!props.value}
                        onChange={(e) => props.onChange(e.target.value)}
                    />
                    {(!props.value) ? (<FormHelperText error>sfweewr</FormHelperText>) : null}
                </FormControl>
                )
            }
        },
        {
            field: 'phone',
            title: 'Телефон',
            editComponent: props => (
                <FormControl className={classes.field}>
                    <Input
                        value={props.value}
                        error={!props.value}
                        onChange={(e) => props.onChange(e.target.value)}
                        inputComponent={TextMaskCustom}
                    />
                    {(!props.value) ? (<FormHelperText error>gergerge</FormHelperText>) : null}
                </FormControl>
            )
        },
        {
            field: 'region',
            title: 'Район',
            editComponent: props => (
                <FormControl className={classes.field}>
                    <Select
                        value={props.value}
                        onChange={(e) => props.onChange(e.target.value)}
                    >
                        {
                            DISTRICTS.map(option => (
                                <MenuItem key={option.id} value={option.label}>{option.label}</MenuItem>
                            ))
                        }
                    </Select>
                    {(!props.value) ? (<FormHelperText error>dshgtdeh</FormHelperText>) : null}
                </FormControl>
            )
        },
        {
            field: 'address',
            title: 'Адреса',
            editComponent: props => (
                <FormControl className={classes.field}>
                    <Input
                        value={props.value}
                        error={!props.value}
                        onChange={(e) => props.onChange(e.target.value)}
                    />
                    {(!props.value) ? (<FormHelperText error>hrhreth</FormHelperText>) : null}
                </FormControl>
            )
        },
        {
            field: 'house_number',
            title: '№ дому',
            editComponent: props => (
                <FormControl className={classes.field}>
                    <Input
                        value={props.value}
                        error={!props.value}
                        onChange={(e) => props.onChange(e.target.value)}
                    />
                    {(!props.value) ? (<FormHelperText error>drhrthr</FormHelperText>) : null}
                </FormControl>
            )
        },
        {
            field: 'flat_number',
            title: '№ кв.',
        },
        {
            field: 'items',
            title: 'Товари',
        },
        { field: 'delivery_date', title: 'Дата', minWidth: 100,
            editComponent: props => (
                <FormControl className={classes.field}>
                    <Select
                        value={props.value}
                        onChange={(e) => props.onChange(e.target.value)}
                    >
                        {
                            getDeliveryDateOptions().map(option => (
                                <MenuItem key={option.id} value={option.value}>{option.label}</MenuItem>
                            ))
                        }
                    </Select>
                    {(!props.value) ? (<FormHelperText error>fgertg</FormHelperText>) : null}
                </FormControl>
            )
        },
        {
            field: 'delivery_time',
            title: 'Час',
            editComponent: props => (
                <FormControl className={classes.field}>
                    <Select
                        value={props.value}
                        onChange={(e) => props.onChange(e.target.value)}
                    >
                        {
                            DELIVERY_TIME_OPTIONS.map(option => (
                                <MenuItem key={option.id} value={option.value}>{option.label}</MenuItem>
                            ))
                        }
                    </Select>
                    {(!props.value) ? (<FormHelperText error>sdsdf</FormHelperText>) : null}
                </FormControl>
            )
        },
        { field: 'comment', title: 'Коментар', minWidth: 100 },
    ];
    // const [data, setData] = useState([]); //table data

    //for error handling
    const [iserror, setIserror] = useState(false)
    const [errorMessages, setErrorMessages] = useState([])

    useEffect(() => {
        // api.get("/users")
        //     .then(res => {
        //         setData(res.data.data)
        //     })
        //     .catch(error=>{
        //         console.log("Error")
        //     })
    }, [])

    const handleRowUpdate = (newData, oldData, resolve) => {
        //validation
        let errorList = []
        if(newData.first_name === ""){
            errorList.push("Please enter first name")
        }
        if(newData.last_name === ""){
            errorList.push("Please enter last name")
        }
        if(newData.email === "" || validateEmail(newData.email) === false){
            errorList.push("Please enter a valid email")
        }

        if(errorList.length < 1){
            // api.patch("/users/"+newData.id, newData)
            //     .then(res => {
            //         const dataUpdate = [...data];
            //         const index = oldData.tableData.id;
            //         dataUpdate[index] = newData;
            //         setData([...dataUpdate]);
            //         resolve()
            //         setIserror(false)
            //         setErrorMessages([])
            //     })
            //     .catch(error => {
            //         setErrorMessages(["Update failed! Server error"])
            //         setIserror(true)
            //         resolve()
            //
            //     })
        }else{
            setErrorMessages(errorList)
            setIserror(true)
            resolve()

        }

    }

    const handleRowAdd = (newData, resolve) => {
        //validation
        // let errorList = []
        // if(newData.first_name === undefined){
        //     errorList.push("Please enter first name")
        // }
        // if(newData.last_name === undefined){
        //     errorList.push("Please enter last name")
        // }
        // if(newData.email === undefined || validateEmail(newData.email) === false){
        //     errorList.push("Please enter a valid email")
        // }
        //
        // if(errorList.length < 1){ //no error
        //     // api.post("/users", newData)
        //     //     .then(res => {
        //     //         let dataToAdd = [...data];
        //     //         dataToAdd.push(newData);
        //     //         setData(dataToAdd);
        //     //         resolve()
        //     //         setErrorMessages([])
        //     //         setIserror(false)
        //     //     })
        //     //     .catch(error => {
        //     //         setErrorMessages(["Cannot add data. Server error!"])
        //     //         setIserror(true)
        //     //         resolve()
        //     //     })
        // }else{
        //     setErrorMessages(errorList)
        //     setIserror(true)
        //     resolve()
        // }


    }

    const handleRowDelete = (oldData, resolve) => {

        // api.delete("/users/"+oldData.id)
        //     .then(res => {
        //         const dataDelete = [...data];
        //         const index = oldData.tableData.id;
        //         dataDelete.splice(index, 1);
        //         setData([...dataDelete]);
        //         resolve()
        //     })
        //     .catch(error => {
        //         setErrorMessages(["Delete failed! Server error"])
        //         setIserror(true)
        //         resolve()
        //     })
    }


    return (
        <MaterialTable
            title="User data from remote source"
            columns={columns}
            data={data}
            icons={tableIcons}
            validationError={true}
            editable={{
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        handleRowUpdate(newData, oldData, resolve);

                    }),
                onRowAdd: (newData) =>
                    new Promise((resolve) => {
                        handleRowAdd(newData, resolve)
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        handleRowDelete(oldData, resolve)
                    }),
            }}
        />
    );
}

export default App;
