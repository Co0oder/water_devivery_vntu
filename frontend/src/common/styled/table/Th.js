import styled from "styled-components";

export default styled.th`
  padding: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: 1s;
  
  position: relative;
  z-index: 1;
  top: 0;
  color: #909090;
  text-align: left;
  font-weight: normal;
  font-size: 13px;

    &:last-child {
      border: 0;
      border-radius: 0 15px 0 0;
    }

    &:first-child {
      border-radius: 15px 0 0 0;
    }
`;
