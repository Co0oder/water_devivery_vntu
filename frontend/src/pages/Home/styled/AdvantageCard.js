import styled from "styled-components";

export default styled.div`
  width: 33%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 767px) {
    width: 93%;
    padding-bottom: 40px;
  }
`;
