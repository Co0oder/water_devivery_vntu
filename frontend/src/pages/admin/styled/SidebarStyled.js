import styled from "styled-components";

export default styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  width: ${({open}) => open ? '300px' : '50px'};
  height: 100%;
  overflow: hidden;
  transition: .5s;

  background: #08113F;

  @media screen and (max-width: 767px) {
    width: ${({open}) => open ? '100%' : '50px'};
  }
`;
