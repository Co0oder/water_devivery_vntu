import styled from "styled-components";

export default styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
	padding: 5px 12px;
    cursor: pointer;
    background: ${({active}) => active ? '#B79DFE' : 'white'};
    border: ${({active}) => active ? '1px solid #B79DFE' : '1px solid #A6A6A6'};
    color: ${({active}) => active ? 'white' : '#B79DFE'};
    z-index: ${({active}) => active ? '1' : '0'};

    border-radius: ${({first, last}) => {
    if (first && last) return ' 5px';
    if (first) return '5px 0 0 5px';
    if (last) return ' 0 5px 5px 0';
}};

    &:not(:first-child){
        margin-left: -2px;
    }
`;
