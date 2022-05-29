import styled from "styled-components";

export default styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 250px;
  justify-content: ${({open}) => open ? 'flex-start' : 'center'};
`;
