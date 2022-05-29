import styled from "styled-components";

export default styled.h1`
  font-size: ${(props) => props.size || '30'}px;
  color: ${(props) => props.color || 'white'};
  font-weight: ${(props) => props.weight || '500'};

  @media screen and (max-width: 767px) {
    font-size: ${({size}) => size ? size / 1.2 : 30 / 1.2}px;
  }

  @media screen and (max-width: 399px) {
    font-size: ${({size}) => size ? size / 1.3 : 30 / 1.3}px;
  }
`;
