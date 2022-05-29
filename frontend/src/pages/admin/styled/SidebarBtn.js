import styled from "styled-components";

export default styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 35px;
  background: rgba(188, 188, 188, 0.64);
  color: #08113F;

  font-family: 'Lato', sans-serif;
  font-size: 19px;

  border-radius: 10px;
  
  cursor: pointer;
  
  &:hover {
    background: rgba(228, 228, 228, 0.767);
  }
`;
