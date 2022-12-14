import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  margin-top: 120px;
  justify-content: center;
  align-items: center;
`;

export const Message = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.regular};
    font-size: ${theme.FONT_SIZE.LG};
    color: ${theme.COLORS['gray-300']};
  `}
  text-align: center;
  margin-top: 16px;
`;
