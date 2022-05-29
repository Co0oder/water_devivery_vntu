import styled from "styled-components";

export default styled.div`
  margin-top: 250px;
  margin-left: 280px;

  @media screen and (max-width: 1400px) {
    margin-left: 100px;
  }

  @media screen and (max-width: 1200px) {
    margin-left: 70px;
  }

  @media screen and (max-width: 991px) {
    margin-left: 50px;
  }

  @media screen and (max-width: 767px) {
    margin-left: 30px;
  }

  @media screen and (max-width: 600px) {
    width: 100%;
    margin: 0;
    position: absolute;
    bottom: 50px;
    left: 0;
    display: flex;
    justify-content: center;
  }
  
`;
