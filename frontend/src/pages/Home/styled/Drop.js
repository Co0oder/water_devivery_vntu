import styled from "styled-components";
import drop from '../../../static/img/drop.png'

export default styled.div`
  width: 80px;
  height: 80px;
  padding-right: 180px;
  background: url(${drop}) no-repeat;
  background-size: 80px 80px;

  @media screen and (max-width: 767px) {
    padding-right: 0;
    padding-bottom: 90px;
  }
`;
