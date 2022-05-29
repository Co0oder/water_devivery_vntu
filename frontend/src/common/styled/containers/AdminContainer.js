import styled from "styled-components";

export default styled.div`
    width: 100%;
    height: 100vh;
    position: relative;
    padding: 15px 15px 15px ${({fullWidth}) => fullWidth ? '315px' : '100px'};
    background-color: #fafafa;
    transition: .5s;
  
    @media screen and (max-width: 767px) {
      padding: 20px 20px 20px 70px;
    }
`;

export const HeaderContainer = styled.div`
    width: 100%;
    height: 2%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
`;

export const BodyContainer = styled.div`
    width: 100%;
    height: 100%;
`;

export const FooterContainer = styled.div`
    width: 100%;
    height: 0%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;
