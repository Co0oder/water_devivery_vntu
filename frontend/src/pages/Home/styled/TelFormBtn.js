import styled from "styled-components";

export default styled.button`
  background-color: #F14B26;
  border-radius: 30px;
  padding: 0 40px;
  transform: translate(-30px, 0);

  @media screen and (max-width: 767px) {
    padding: 0 20px;
    border-radius: 25px;
    transform: translate(-25px, 0);
  }
`;
