import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    padding-top: 19px;
    margin-left: 49px;
    margin-right: 49px;
    padding-bottom: 17px;
    justify-content: space-between;
    position: fixed;
    left: ${props => props.menuToggled ? '227px' : '98px'};
    right: 357px;
    top: 0;
    background-color: #161B3B;
`;

export const Button = styled.button`
    border-radius: 12px;
    height: 43px;
    padding: 13px 24px;
    background-color: #313B6B;
    border: 0;
    color: white;
    font-size: 14px;
    margin: 0px 22px;
    cursor: pointer;
`;

export const IconButton = styled.button`
    border-radius: 12px;
    width: 43px;
    height: 43px;
    background-color: #313B6B;
    border: 0;
    cursor: pointer;
`;

