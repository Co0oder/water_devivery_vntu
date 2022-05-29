import styled from "styled-components";

export default styled.div`
  width: 100%;
  background-color: ${({color}) => color ? color : 'white'};
  padding-bottom: 1px;
  margin-top: -1px;
`;
