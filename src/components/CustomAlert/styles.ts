import styled, { css } from 'styled-components/native';

export const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.25);
  align-items: center;
  justify-content: center;
`;

export const Container = styled.View`
  width: 327px;
  height: 192px;
  padding: 40px 24px 24px;
  background-color: ${({ theme }) => theme.COLORS['gray-700']};
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.bold};
    font-size: ${theme.FONT_SIZE.LG};
    color: ${theme.COLORS['gray-200']};
  `}
  text-align: center;
  margin-bottom: 32px;
`;
