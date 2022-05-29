import styled from "styled-components";

export default styled.textarea`
  background-color: #C4C4C4;
  width: ${({width}) => width || '100%'};
  resize: none;
  height: 170px;
  padding: 20px;
  margin: 12px 0;
  font-size: 17px;
  border-radius: 30px;
  color: #6D6060;
  box-shadow: 0 0 10px rgba(88, 88, 88, 0.3);
`;
