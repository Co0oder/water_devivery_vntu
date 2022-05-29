import styled from "styled-components";

export default styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    padding: 50px 10px;
    overflow: hidden;

  @media screen and (max-width: 767px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
