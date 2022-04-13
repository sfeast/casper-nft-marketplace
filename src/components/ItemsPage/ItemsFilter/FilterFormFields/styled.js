import styled from 'styled-components';

export const StyledButtonsContainer = styled.div`
    position: sticky;
    bottom: 10px;
    width: 100%;
    z-index: 1;
    margin-top: 20px;
    background-color: ${({ theme }) => theme.palette.background.default};
    display: grid;
    column-gap: 10px;
    grid-template-columns: 1fr auto;
`;

export const StyledPriceContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    grid-gap: 5px;
`;

export const StyledFormFieldsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
`;
