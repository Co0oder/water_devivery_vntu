import styled from "styled-components";
import wave from '../../../static/img/wave.svg'

export default styled.div`
  height: 0;
  width: 100%;
  position: relative;
  margin-top: 300px;

  & div:first-child {
    mask-image: url(${wave});
    background-color: ${({color}) => color || 'white'};
    position: absolute;
    top: -198px;
    width: 6400px;
    height: 198px;
    animation: wave 8s cubic-bezier( 0.36, 0.45, 0.63, 0.53) infinite;
  }

  & div:nth-child(2) {
    top: -175px;
    opacity: 1;
    animation: wave 8s cubic-bezier( 0.36, 0.45, 0.63, 0.53) -.225s infinite, swell 8s ease -2.25s infinite;
  }
`;
