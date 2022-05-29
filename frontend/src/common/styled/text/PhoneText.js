import styled from "styled-components";

export default styled.a`
  font-size: ${(props) => props.size || 14}px;
  font-weight: ${(props) => props.weight || 'bold'};
  color: white;

  @media screen and (max-width: 767px) {
    font-size: ${({size}) => size ? size/1.3 : 14/1.3}px;
  }

  @media screen and (max-width: 399px) {
    font-size: ${({size}) => size ? size/1.5 : 14/1.5}px;
  }
`;
