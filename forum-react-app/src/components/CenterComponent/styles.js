import styled from 'styled-components';
import { Wrapper } from '../PostComponent/styles';

export const Container = styled.div`
    flex-grow: 1;
    transition: margin-left ease 0.3s;
    margin-left: ${props => props.menuToggled ? '227px': '98px'};
    min-width: 700px;

    ${Wrapper}:first-child {
        margin-top: 80px;
    }

    ::-webkit-scrollbar {
        display: none;
    }
     
    ::-webkit-scrollbar-track {
        display: none;
    }
     
    ::-webkit-scrollbar-thumb {
        display: none;
    }
`;
