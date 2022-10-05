import { DietVariant } from '@screens/Home';
import { ArrowLeft } from 'phosphor-react-native';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import styled, { css } from 'styled-components/native';

type Props = {
  variant?: DietVariant;
};

export const Container = styled.View<Props>`
  width: 100%;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, variant }) =>
    variant
      ? variant === 'inDiet'
        ? theme.COLORS['green-light']
        : theme.COLORS['red-light']
      : theme.COLORS['gray-500']};
  padding: 33px 24px;
`;

export const IconContainer = styled(
  TouchableOpacity as new (props: TouchableOpacityProps) => TouchableOpacity
)`
  align-items: center;
  justify-content: center;
`;

export const StyledIcon = styled(ArrowLeft).attrs(({ theme }) => ({
  size: 24,
  color: theme.COLORS['gray-200'],
}))``;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.bold};
    font-size: ${theme.FONT_SIZE.LG};
    color: ${theme.COLORS['gray-100']};
    margin: 0 auto;
  `}
`;
