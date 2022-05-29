import styled from "styled-components";

export default styled.input`
    background-color: #C4C4C4;
    width: ${({width}) => width || '100%'};
    padding: 20px;
    margin: 12px 0;
    font-size: 17px;
    border-radius: 30px;
    color: #6D6060;
    box-shadow: 0 0 13px rgba(88, 88, 88, 0.25);
`;
