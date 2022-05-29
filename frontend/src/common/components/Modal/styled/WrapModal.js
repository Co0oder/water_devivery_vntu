import styled from "styled-components";
import {animated} from "react-spring";


export default styled(animated.div)`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: grid;
  align-items: center;
  justify-items: center;
  margin: auto;
  overflow: auto;
`;
