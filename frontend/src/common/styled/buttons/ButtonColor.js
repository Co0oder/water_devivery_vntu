import styled from "styled-components";

export default styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 11px 22px;
  background: ${(props) => props.color};
  border-radius: 30px;
  &:hover {
    background-color: #bb421d
  },
`;
