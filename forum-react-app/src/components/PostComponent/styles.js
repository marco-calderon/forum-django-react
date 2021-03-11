import styled from 'styled-components';

export const Wrapper = styled.div`
    border-radius: 42px;
    background-color: #1C2146;
    cursor: pointer;
    margin-left: 49px;
    margin-right: 49px;
    padding: 45px;
    display: flex;
    margin-bottom: 21px;
`;

export const CounterContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    margin-right: 31px;
`;

export const ContentContainer = styled.div`
    width: 100%;
`;

export const Footer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 11px;
`;

export const CounterLabel = styled.h4`
    font-size: 24px;
    margin: 0px;
    font-weight: 500;
`;

export const CounterButton = styled.div`
    color: #656C9E;
    width: 30px;
`;

export const Title = styled.h4`
    font-size: 22px;
    margin: 0px;
    margin-bottom: 20px;
    font-weight: 500;
`;

export const Content = styled.div`
    margin-top: 20px;
    font-size: 13px;
`;

export const TagsContainer = styled.div`
    margin-top: 11px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
`;

export const Tag = styled.span`
    border-radius: 9px;
    padding: 4px 10px;
    background-color: #283059;
    font-size: 9px;
    margin-left: 7px;
`;

export const User = styled.div`
    display: flex;
    align-items: center;
`;

export const UserIcon = styled.div`
    border-radius: 4px;
    background-color: #6371EC;
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const UserLabel = styled.span`
    color: #656C9E;
    margin-left: 11px;
`;

export const Answers = styled.div`
    display: flex;
    align-items: center;
`;

export const AnswerIcon = styled.span`
    
`;

export const AnswerLabel = styled.span`
    font-size: 13px;
    margin-left: 9px;
    color: #7884F3;
    font-weight: 500;
`;