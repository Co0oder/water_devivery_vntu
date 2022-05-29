import styled from "styled-components";

export default styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;

  @media screen and (max-width: 799px) {
    flex-direction: column;

    & a {
      padding-bottom: 10px;
    }
  }
`;
