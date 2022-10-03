import { Variant } from '@screens/Home';
import { ArrowUpRight } from 'phosphor-react-native';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import styled, { css } from 'styled-components/native';

type Props = {
  variant: Variant;
};

export const Container = styled(
  TouchableOpacity as new (props: TouchableOpacityProps) => TouchableOpacity
)<Props>`
  width: 100%;
  padding: 20px 16px;
  background-color: ${({ theme, variant }) =>
    variant === 'inDiet'
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
      variant === 'inDiet'
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
    font-size: ${theme.FONT_SIZE['2XL']};
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
