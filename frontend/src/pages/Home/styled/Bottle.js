import styled from "styled-components";
import bottle from '../../../static/img/bottle.png'
import {animated} from "react-spring";

export default styled(animated.div)`
  width: 377px;
  height: 624px;
  position: absolute;
  bottom: 10px;
  right: 50px;
  background: url(${bottle}) no-repeat;
  background-size: 377px 624px;

    @media (max-width: 1400px) {
        width: 250px;
        height: 450px;
        bottom: 40px;
        right: 30px;
        background-size: 250px 450px;
    }
    
    @media (max-width: 900px) {
        width: 220px;
        height: 350px;
        bottom: 100px;
        right: 20px;
        background-size: 220px 350px;
    }
    
    @media (max-width: 400px) {
        width: 200px;
        height: 320px;
        bottom: 110px;
        right: 20px;
        background-size: 200px 320px;
    }
    
    @media (max-width: 250px) {
        width: 150px;
        height: 250px;
        bottom: 100px;
        right: 20px;
        background-size: 150px 250px;
    }
`;
