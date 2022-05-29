import styled from "styled-components";

export default styled.h1`
  font-size: ${(props) => props.size || 40}px;
  color: ${(props) => props.color || 'white'};
  font-weight: bold;

  @media screen and (max-width: 767px) {
    font-size: ${({size}) => size ? size / 1.2 : 40 / 1.2}px;
    text-align: center;
    margin: auto;
  }

  @media screen and (max-width: 399px) {
    font-size: ${({size}) => size ? size / 1.3 : 40 / 1.3}px;
  }

  @media screen and (max-width: 330px) {
    font-size: ${({size}) => size ? size / 1.4 : 40 / 1.4}px;
  }
`;
