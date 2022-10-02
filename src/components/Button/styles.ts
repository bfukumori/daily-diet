import styled, { css } from 'styled-components/native';

type Props = { variant: 'primary' | 'secondary' };

export const Container = styled.TouchableOpacity<Props>`
  ${({ theme, variant }) => css`
    background-color: ${variant === 'primary'
      ? theme.COLORS['gray-200']
      : 'transparent'};
    border: 1px solid
      ${variant === 'primary' ? 'transparent' : theme.COLORS['gray-100']};
  `}

  width: 100%;
  padding: 16px 24px;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const Title = styled.Text<Props>`
  ${({ theme, variant }) => css`
    color: ${variant === 'primary'
      ? theme.COLORS.white
      : theme.COLORS['gray-100']};
    font-family: ${theme.FONT_FAMILY.bold};
    font-size: ${theme.FONT_SIZE.SM};
  `}
  margin-left:12px
`;
