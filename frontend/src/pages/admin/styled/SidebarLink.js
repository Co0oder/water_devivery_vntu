import styled from "styled-components";

export default styled.div`
  display: flex;
  align-items: center;

  padding: 7px 0 7px ${({open}) => open ? '30px' : '15px'};
  transition: .5s;
  
  & span {
    font-family: 'Lato', sans-serif;
    font-style: normal;
    font-size: 20px;
    line-height: 30px;
    transition: .5s;

    color: #C1C1C1;
  }

  ${({active}) => active ? 'background: #FDFDFD; & span { color: #08113F; } & svg { fill: #08113F; }' : ''}
  
  &:hover {
    background: #FDFDFD;
    
    & span {
      color: #08113F;
    }
    & svg {
      fill: #08113F;
    }
  }
`;
