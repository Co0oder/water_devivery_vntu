import styled from "styled-components";

export default styled.td`
  padding: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: 1s;
  
  position: relative;
  display: flex;
  align-items: center;
  min-height: 50px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 14px;
  color: #5F5F5F;

    &:last-child {
        border: 0;
        border-radius: 0 10px 10px 0;
        justify-content: space-around;
    }

    &:first-child {
        margin-left: 0;
        border-radius: 10px 0 0 10px;
    }
`;
