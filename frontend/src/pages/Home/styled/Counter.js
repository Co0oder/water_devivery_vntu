import styled from "styled-components";
import {animated} from "react-spring";


export default styled(animated.span)`
    transform: translate(0, -170px);
  font-size: 300px;
  font-weight: bold;
  color: #F14B26;

  @media screen and (max-width: 991px) {
    font-size: 250px;
  }

  @media screen and (max-width: 767px) {
    font-size: 200px;
  }

  @media screen and (max-width: 479px) {
    font-size: 150px;
  }
`;
