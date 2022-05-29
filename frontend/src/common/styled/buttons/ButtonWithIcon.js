import styled from "styled-components";

export default styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px 20px;
  background: ${(props) => props.color};
  border-radius: 20px;

  @media (max-width: 850px) {
    padding: 0;
  }
`;
