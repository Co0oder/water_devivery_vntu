import styled from "styled-components";

export default styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  padding: 50px 50px 50px ${({fullWidth}) => fullWidth ? '400px' : '100px'};
  background-color: #fafafa;
  transition: .5s;
`;
