import { ArrowUpRight } from 'phosphor-react-native';
import styled, { css } from 'styled-components/native';

type Props = {
  variant: 'primary' | 'secondary';
};

export const Container = styled.View<Props>`
  width: 100%;
  padding: 20px 16px;
  background-color: ${({ theme, variant }) =>
    variant === 'primary'
      ? theme.COLORS['green-light']
      : theme.COLORS['red-light']};
  border-radius: 8px;
  align-items: center;
  position: relative;
`;

export const StyledIcon = styled(ArrowUpRight).attrs<Props>(
  ({ theme, variant }) => ({
    size: 24,
    color:
      variant === 'primary'
        ? theme.COLORS['green-dark']
        : theme.COLORS['red-dark'],
  })
)<Props>`
  position: absolute;
  top: 8px;
  right: 8px;
`;

export const StyledNumber = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.bold};
    font-size: ${theme.FONT_SIZE.XL};
    color: ${theme.COLORS['gray-100']};
  `}
`;

export const StyledText = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.regular};
    font-size: ${theme.FONT_SIZE.SM};
    color: ${theme.COLORS['gray-200']};
  `}
`;
