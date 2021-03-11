import styled from 'styled-components';

export const Container = styled.div`
    border-radius: 0 42px 0 0;
    background-color: #6371EC;
    display: flex;
    flex-direction: column;
    padding: 40px;
    max-width: 147px;
    width: 147px;
    transition: transform ease 0.3s, opacity ease 0.3s, max-height ease-in-out 0.3s;
    transform: translateX(${({expanded}) => expanded ? '0px' : '-60px' });
    opacity: ${({expanded}) => expanded ? '1' : '0' };
    position: fixed;
    bottom: 0;
    left: 0;
    max-height: 24px;

    &:hover {
        max-height: 244px;
    }
`;

export const Title = styled.h4`
    font-size: 17px;
    color: #fff;
    margin: 0;
    font-weight: 500;
    text-align: center;
`;

export const TitleContainer = styled.div`
    margin-bottom: 16px;
`;

export const Description = styled.p`
    font-size: 10px;
    color: #fff;
    margin: 0;
`;

export const Button = styled.button`
    border: 0;
    margin: 0;
    font-size: 12px;
    padding: 8px 16px;
    color: #fff;
    border-radius: 9px;
    margin-top: 27px;
    background-color: #7884F3;
    cursor: pointer;
`;