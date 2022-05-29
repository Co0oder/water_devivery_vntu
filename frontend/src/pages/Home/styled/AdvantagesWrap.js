import styled from "styled-components";
import {animated} from "react-spring";

export default styled(animated.div)`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 120px 0;
  
  @media screen and (max-width: 767px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 60px 0;
  }
`;
