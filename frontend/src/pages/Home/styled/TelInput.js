import styled from "styled-components";

export default styled.input`
    background-color: #C4C4C4;
  width: 350px;
  padding: 35px 50px;
  font-size: 20px;
  border-radius: 30px;
  color: #6D6060;
  transform: translate(30px, 0);

  @media screen and (max-width: 767px) {
    width: 80%;
    padding: 25px 30px;
    font-size: 17px;
    border-radius: 25px;
    transform: translate(25px, 0);
  }
`;
