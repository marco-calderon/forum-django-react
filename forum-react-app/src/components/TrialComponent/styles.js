import styled from 'styled-components';

export const Container = styled.div`
    border-radius: 0 42px 42px 0;
    background-color: #6371EC;
    display: flex;
    flex-direction: column;
    padding: 40px;
    max-width: 147px;
    width: 147px;
    transition: transform ease 0.3s, opacity ease 0.3s, max-height ease-in-out 0.3s;
    transform: translateX(${({expanded}) => expanded ? '0px' : '-60px' });
    opacity: ${({expanded}) => expanded ? '1' : '0' };
    margin-top: 30px;
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
    font-size: 12px;
    color: #fff;
    margin: 0;
    margin-bottom: 16px;
`;

export const Button = styled.button`
    border-radius: 12px;
    height: 43px;
    padding: 13px 24px;
    border: 0;
    color: white;
    font-size: 14px;
    cursor: pointer;
    background-color: #7884F3;
`;