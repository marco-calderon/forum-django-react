import styled from 'styled-components';

export const LogoContainer = styled.div`
    display: flex;
    margin-left: 39px;
    margin-top: 30px;
    margin-bottom: 28px;
    cursor: pointer;
`;

export const NavigationBar = styled.div`
    display: flex;
    border-top-right-radius: 42px;
    border-bottom-right-radius: 42px;
    background-color: #1C2146;
    padding-left: 39px;
    flex-direction: column;
    padding-top: 10px;
    padding-bottom: 10px;
`;

export const NavigationBarItemIcon = styled.span`
    width: 24px;
    height: 24px;
`;

export const NavigationBarItemLabel = styled.div`
    margin-left: 31px;
    font-size: 14px;
`;

export const NavigationBarItem = styled.div`
    display: flex;
    color: ${props => props.active ? '#fff' : '#656C9E'};
    flex-direction: row;
    align-items: center;
    margin-bottom: 24px;
    margin-top: 24px;
    align-items: center;
    cursor: pointer;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: ${({expanded}) => expanded ? '227px' : '98px' };
    min-width: ${({expanded}) => expanded ? '227px' : '98px' };
    transition: width ease 0.3s, min-width ease 0.3s;
    position: fixed;

    ${NavigationBarItemLabel} {
        transition: transform ease 0.3s, opacity ease 0.3s;
        transform: translateX(${({expanded}) => expanded ? '0px' : '-30px' });
        opacity: ${({expanded}) => expanded ? '1' : '0' };
    }
`;