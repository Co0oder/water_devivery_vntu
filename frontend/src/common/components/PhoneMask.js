import React from "react";
import MaskedInput from "react-input-mask";

function PhoneMask(props) {
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

export default PhoneMask;
