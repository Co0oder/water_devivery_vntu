import styled from "styled-components";

export default styled.div`
  width: 600px;
  padding: 40px 70px;
  background-color: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 767px) {
    width: 100%;
    height: 100%;
    border-radius: 0;
    padding: 40px 40px;
  }

  @media screen and (max-width: 399px) {
    padding: 30px 20px;
  }
`;
