import InputMask from 'react-input-mask';
import styled from "styled-components";
const PhoneInput = ({value, changeHandler, className}) => {
    return (
        <InputMask 
            mask="+380(99)-999-9999" 
            placeholder="+380(__)-___-____" 
            class="styledInput"
            onChange={(e) => changeHandler(e.target.value)}
            width={`${({width}) => width || '100%'};`}
            className={className}
            value={value}
            />
    )
}
const StyledPhoneInput = styled(PhoneInput)`
  background-color: #C4C4C4;
  width: ${({width}) => width || '100%'};
  resize: none;
  height: 60px;
  padding: 20px;
  margin: 12px 0;
  font-size: 17px;
  border-radius: 30px;
  color: #6D6060;
  box-shadow: 0 0 10px rgba(88, 88, 88, 0.3);
`;

export default StyledPhoneInput;
