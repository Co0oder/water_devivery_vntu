import styled from "styled-components";

export default styled.div`
  margin-top: 70px;
  margin-left: 280px;
  
  @media screen and (max-width: 1400px) {
    margin-top: 55px;
    margin-left: 100px;
  }

  @media screen and (max-width: 1200px) {
    margin-top: 45px;
    margin-left: 70px;
  }

  @media screen and (max-width: 991px) {
    margin-top: 40px;
    margin-left: 50px;
  }

  @media screen and (max-width: 767px) {
    margin-left: 30px;
  }

  @media screen and (max-width: 479px) {
    margin-left: 0px;
  }
  
`;
