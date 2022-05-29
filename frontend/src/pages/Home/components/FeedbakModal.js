import { makeStyles } from '@material-ui/core/styles';
import Modal from "../../../common/components/Modal/Modal";
import FeedbackModalWrap from "../styled/FeedbackModalWrap";
import TitleText from "../styled/TitleText";
import FormInput from "../styled/FormInput";
import ButtonColor from "../../../common/styled/buttons/ButtonColor";
import TextButton from "../../../common/styled/text/TextButton";
import React, {useState} from "react";
import {sendCollData} from "../../../api/calls";
import PhoneInput from "./PhoneInput/PhoneInput";
import {i18n, keys} from '../../../i18n';
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import RowBetween from "../styled/RowBetween";
import MaskedInput from "react-input-mask";
import Button from "@material-ui/core/Button";
import FormHelperText from '@material-ui/core/FormHelperText';
import PhoneMask from "../../../common/components/PhoneMask";

const useStyles = makeStyles((theme) => ({
    input: {
        width: '90%',
        margin: theme.spacing(1),
    },
    button: {
        background: '#F14B26',
        color: 'white',
        fontSize: '13px',
        borderRadius: '10px',
        padding: '8px 17px',
        margin: '25px 0 -10px 0',
        '&:hover': {
            backgroundColor: '#bb421d',
        },
    },
}));


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

function FeedbackModal({ show, onHide }) {
    const classes = useStyles();
    const [tel, setTel] = useState('')
    const [name, setName] = useState('')
    const [errors, setErrors] = useState({});

    function validate(){
        const isWords = (value) => /[а-яА-ЯіїІЇєa-zAz]{3,30}/u.test(value) && !value.match(/\d+/);
        const nameError = !isWords(name) ? i18n.t(keys.validation.name) : '';
        const phoneError = tel.replace(/[^\d]/g,'').length < 12 ? i18n.t(keys.validation.phone) : '';
        setErrors({...errors, name: nameError, phone: phoneError});
        return !nameError && !phoneError;

    }
    const onSubmit = async () => {
        if(validate()){
            onHide()
            await sendCollData({name, phone: tel.replace(/[^\d]/g,'')})
        }
    }

    return (
        <Modal show={show} onHide={onHide}>
            <FeedbackModalWrap>
                <TitleText color="black" size="20">{i18n.t(keys.modals.call.title.p1).toUpperCase()}</TitleText>
                <TitleText color="black" size="20">{i18n.t(keys.modals.call.title.p2).toUpperCase()}</TitleText>
                <TitleText color="black" size="20">{i18n.t(keys.modals.call.title.p3).toUpperCase()}</TitleText>
                <br/>
                <FormControl className={classes.input}>
                    <InputLabel htmlFor="standard-adornment-amount">{i18n.t(keys.modals.inputs.name)}</InputLabel>
                    <Input
                        value={name}
                        error={!!errors.name}
                        onChange={(e) => setName(e.target.value)}
                    />
                {(errors.name) ? (<FormHelperText error>{errors.name}</FormHelperText>) : null}
                </FormControl>
                <FormControl className={classes.input}>
                    <InputLabel htmlFor="formatted-text-mask-input">Телефон</InputLabel>
                    <Input
                        value={tel}
                        onChange={(e) => setTel(e.target.value)}
                        inputComponent={PhoneMask}
                        error={!!errors.phone}
                    />
                {(errors.phone) ? (<FormHelperText error>{errors.phone}</FormHelperText>) : null}
                </FormControl>
                <Button className={classes.button} size="small" variant="contained" onClick={onSubmit}>
                    {i18n.t(keys.modals.call.button.p1).toUpperCase()} {i18n.t(keys.modals.call.button.p2).toUpperCase()}
                </Button>
            </FeedbackModalWrap>
        </Modal>
    )
}

export default FeedbackModal;
