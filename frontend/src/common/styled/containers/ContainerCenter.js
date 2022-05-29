import styled from "styled-components";

export default styled.div`
  position: relative;
  width: 100%;
  padding: 0 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 991px) {
    padding: 0 100px;
  }

  @media screen and (max-width: 767px) {
    padding: 0 50px;
  }

  @media screen and (max-width: 479px) {
    padding: 0 20px;
  }
`;
