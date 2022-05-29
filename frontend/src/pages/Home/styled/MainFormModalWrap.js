import styled from "styled-components";

export default styled.div`
  position: relative;
  padding: 40px 70px;
  width: 600px;
  background-color: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 767px) {
    width: 100%;
    height: 100vh;
    border-radius: 0;
    padding: 40px 40px;
  }

  @media screen and (max-width: 399px) {
    padding: 30px 20px;
  }
`;


