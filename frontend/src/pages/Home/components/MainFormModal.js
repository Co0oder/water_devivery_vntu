import React, {useEffect, useState} from "react";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Modal from "../../../common/components/Modal/Modal";
import MainFormModalWrap from "../styled/MainFormModalWrap";
import TitleText from "../styled/TitleText";
import RowBetween from "../styled/RowBetween";
import {DELIVERY_TIME_OPTIONS} from "../../../constants/form"
import {i18n, keys} from '../../../i18n';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import FormHelperText from '@material-ui/core/FormHelperText';
import PhoneMask from "../../../common/components/PhoneMask";
import CustomDatePicker from "./CustomDatePicker";
import {getDeliveryDateOptions, getDeliveryTimeOptions} from "../../../helpers/fromDataHelper";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    button: {
        background: '#F14B26',
        color: 'white',
        fontSize: '13px',
        borderRadius: '10px',
        padding: '8px 17px',
        margin: '15px 0 -10px 0',
        '&:hover': {
            backgroundColor: '#bb421d',
        },
    },
    margin: {
        margin: theme.spacing(1),
    },
    textField: {
        width: '43%',
    },
    houseNum: {
        width: '14%'
    },
    address: {
        width: '55%'
    },
    districts: {
        width: '100%'
    }
}));

const DEFAULT_VALUES = {
    name: '',
    tel: '',
    region: '',
    address: '',
    houseNum: '',
    flatNum: '',
    deliveryDate: (getDeliveryDateOptions() || [{}])[0].value,
    deliveryTime: '',
    comment: '',
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

function FeedbackModal({ show, onHide, sendOrder }) {
    const [values, setValues] = useState(DEFAULT_VALUES);
    const [errors, setErrors] = useState({});
    const classes = useStyles();

    useEffect(() => {
        if (values.deliveryTime
            && !getDeliveryTimeOptions(values.deliveryDate).find(t => t.value === values.deliveryTime)) {
            setValues({ ...values, deliveryTime: '' })
        }
    }, [values])

    const handleChange = (prop) => (event) => {
        if (prop === 'flatNum' && !Number(event.target.value)) return;
        if (errors[prop]) setErrors({...errors, [prop]: ''})
        setValues({ ...values, [prop]: event.target.value });
    };

    function validate(){
        const isWords = (value) => /[а-яА-ЯіїІЇєa-zAz]{3,30}/u.test(value) && !value.match(/\d+/);
        const isNumber = (value) => !isNaN(+value);
        const name = !isWords(values.name) ? i18n.t(keys.validation.name) : '';
        const tel = values.tel.replace(/[^\d]/g,'').length < 12 ? i18n.t(keys.validation.phone) : '';
        const address = !values.address ? i18n.t(keys.validation.required) : '';
        const houseNum = !values.houseNum ? i18n.t(keys.validation.required) : '';
        const flatNum = values.flatNum && !isNumber(values.flatNum) ?  i18n.t(keys.validation.number) : '';
        const deliveryDate = !values.deliveryDate ? i18n.t(keys.validation.required) : '';
        const deliveryTime = !values.deliveryTime ? i18n.t(keys.validation.required) : '';
        const region = !values.region ? i18n.t(keys.validation.required) : '';
        setErrors({...errors, name, tel, address, houseNum, flatNum, deliveryDate, deliveryTime, region});
        return !name &&
            !tel &&
            !region &&
            !address &&
            !flatNum &&
            !houseNum &&
            !deliveryTime &&
            !deliveryDate;

    }

    const onSubmit = () => {
        if(validate()){
            sendOrder({
                name: values.name,
                address: values.address,
                house_number: values.houseNum,
                region: values.region,
                flat_number: values.flatNum,
                phone: values.tel.replace(/[^\d]/g,''),
                delivery_date: moment(values.deliveryDate).format('DD-MM-YY'),
                delivery_time: values.deliveryTime,
                comment: values.comment,
            })
            onHide();
            setValues(DEFAULT_VALUES);
        }
    }

    return (
        <Modal show={show} onHide={onHide}>
            <MainFormModalWrap>
                <TitleText color="black" size="25" style={{paddingBottom: '35px'}}>{i18n.t(keys.modals.order.title).toUpperCase()}</TitleText>
                <RowBetween>
                    <FormControl className={clsx(classes.margin, classes.textField)}>
                        <InputLabel htmlFor="standard-adornment-amount">{i18n.t(keys.modals.inputs.name)}</InputLabel>
                        <Input
                            value={values.name}
                            error={!!errors.name}
                            onChange={handleChange('name')}
                        />
                        {(errors.name) ? (<FormHelperText error>{errors.name}</FormHelperText>) : null}
                    </FormControl>
                    <FormControl className={clsx(classes.margin, classes.textField)}>
                        <InputLabel htmlFor="formatted-text-mask-input">Телефон</InputLabel>
                        <Input
                            value={values.tel}
                            onChange={handleChange('tel')}
                            error={!!errors.tel}
                            inputComponent={PhoneMask}
                        />
                        {(errors.tel) ? (<FormHelperText error>{errors.tel}</FormHelperText>) : null}
                    </FormControl>
                </RowBetween>

                <RowBetween>
                    <FormControl className={clsx(classes.margin, classes.textField)}>
                        {/*<InputLabel id="demo-simple-select-label">Дата доставки</InputLabel>*/}
                        <CustomDatePicker onDataChange={(val) => setValues({ ...values, deliveryDate: val })} value={values.deliveryDate} />
                        {(errors.deliveryDate) ? (<FormHelperText error>{errors.deliveryDate}</FormHelperText>) : null}
                    </FormControl>
                    <FormControl className={clsx(classes.margin, classes.textField)}>
                        <InputLabel id="demo-simple-select-label">{i18n.t(keys.modals.inputs.deliveryTime)}</InputLabel>
                        <Select
                            value={values.deliveryTime}
                            onChange={handleChange('deliveryTime')}
                        >
                            {
                                getDeliveryTimeOptions(values.deliveryDate).map(option => (
                                    <MenuItem key={option.id} value={option.value}>{option.label}</MenuItem>
                                ))
                            }
                        </Select>
                        {(errors.deliveryTime) ? (<FormHelperText error>{errors.deliveryTime}</FormHelperText>) : null}
                    </FormControl>
                </RowBetween>

                <RowBetween>
                    <FormControl className={clsx(classes.margin, classes.districts)}>
                        <InputLabel id="demo-simple-select-label">Район</InputLabel>
                        <Select
                            value={values.region}
                            onChange={handleChange('region')}
                        >
                            {
                                DISTRICTS.map(option => (
                                    <MenuItem key={option.id} value={option.label}>{option.label}</MenuItem>
                                ))
                            }
                        </Select>
                        {(errors.region) ? (<FormHelperText error>{errors.region}</FormHelperText>) : null}
                    </FormControl>
                </RowBetween>


                <RowBetween>
                    <FormControl className={clsx(classes.margin, classes.address)}>
                        <InputLabel htmlFor="standard-adornment-amount">{i18n.t(keys.modals.inputs.address)}</InputLabel>
                        <Input
                            value={values.address}
                            error={!!errors.address}
                            onChange={handleChange('address')}
                        />
                        {(errors.address) ? (<FormHelperText error>{errors.address}</FormHelperText>) : null}
                    </FormControl>
                    <FormControl className={clsx(classes.margin, classes.houseNum)}>
                        <InputLabel htmlFor="standard-adornment-amount">№ буд.</InputLabel>
                        <Input

                            value={values.houseNum}
                            onChange={handleChange('houseNum')}
                        />
                        {(errors.houseNum) ? (<FormHelperText error>{errors.houseNum}</FormHelperText>) : null}
                    </FormControl>
                    <FormControl className={clsx(classes.margin, classes.houseNum)}>
                        <InputLabel htmlFor="standard-adornment-amount">№ кв.</InputLabel>
                        <Input
                            value={values.flatNum}
                            onChange={handleChange('flatNum')}
                        />
                    </FormControl>
                    {(errors.flatNum) ? (<FormHelperText error>{errors.flatNum}</FormHelperText>) : null}
                </RowBetween>

                <RowBetween>
                    <FormControl fullWidth className={classes.margin}>
                        <InputLabel htmlFor="standard-adornment-amount">{i18n.t(keys.modals.inputs.comment)}</InputLabel>
                        <Input
                            multiline
                            rows={3}
                            value={values.comment}
                            onChange={handleChange('comment')}
                        />
                    </FormControl>
                </RowBetween>
                <Button className={classes.button} size="small" variant="contained" onClick={onSubmit}>
                    {i18n.t(keys.modals.order.button).toUpperCase()}
                </Button>
            </MainFormModalWrap>
        </Modal>
    )
}

export default FeedbackModal;
