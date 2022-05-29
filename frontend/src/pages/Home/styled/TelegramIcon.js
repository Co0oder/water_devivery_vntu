import styled from "styled-components";
import telega from '../../../static/img/telegram_logo.png'

export default styled.div`
  width: 30px;
  height: 30px;
  background: url(${telega}) no-repeat;
  background-size: 30px 30px;
  
  @media (max-width: 850px) {
    width: 40px;
    height: 40px;
    background-size: 40px 40px;
  }
`;
