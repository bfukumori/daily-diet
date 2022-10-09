import styled, { css } from 'styled-components/native';
import { ButtonType } from '.';

type Props = {
  hasIcon?: boolean;
  variant: ButtonType;
};

export const Container = styled.TouchableOpacity<Props>`
  ${({ theme, variant }) => css`
    background-color: ${variant === 'dark'
      ? theme.COLORS['gray-200']
      : 'transparent'};
    border: 1px solid
      ${variant === 'dark' ? 'transparent' : theme.COLORS['gray-100']};
  `}
  padding: 16px 24px;
  border-radius: 6px;
  max-height: 60px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const Title = styled.Text<Props>`
  ${({ theme, variant, hasIcon }) => css`
    color: ${variant === 'dark'
      ? theme.COLORS.white
      : theme.COLORS['gray-100']};
    font-family: ${theme.FONT_FAMILY.bold};
    font-size: ${theme.FONT_SIZE.SM};
    margin-left: ${hasIcon ? '12px' : 0};
  `}
`;
