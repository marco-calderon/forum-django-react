import styled from 'styled-components';

export const MaxLinesParagraph = styled.p`
    display: -webkit-box;
    -webkit-line-clamp: ${props => props.lines ? props.lines : '3'};
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`;