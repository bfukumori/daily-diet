import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled, { css } from 'styled-components/native';
import { ArrowLeft } from 'phosphor-react-native';
import { DietVariant } from '@screens/Home';

type Props = {
  variant: DietVariant;
};

export const Container = styled(SafeAreaView)<Props>`
  flex: 1;
  background-color: ${({ theme, variant }) =>
    variant === 'inDiet'
      ? theme.COLORS['green-light']
      : theme.COLORS['red-light']};
`;

export const Header = styled.View<Props>`
  position: relative;
  width: 100%;
  height: 168px;
  background-color: ${({ theme, variant }) =>
    variant === 'inDiet'
      ? theme.COLORS['green-light']
      : theme.COLORS['red-light']};
  align-items: center;
  justify-content: center;
`;

export const IconContainer = styled(
  TouchableOpacity as new (props: TouchableOpacityProps) => TouchableOpacity
)`
  position: absolute;
  top: 24px;
  left: 24px;
`;

export const StyledIcon = styled(ArrowLeft).attrs<Props>(
  ({ theme, variant }) => ({
    size: 24,
    color:
      variant === 'inDiet'
        ? theme.COLORS['green-dark']
        : theme.COLORS['red-dark'],
  })
)<Props>``;

export const StyledNumber = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.bold};
    font-size: ${theme.FONT_SIZE['2MD']};
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

export const Content = styled.View`
  flex: 1;
  padding: 33px 24px;
  background-color: ${({ theme }) => theme.COLORS['gray-700']};
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.bold};
    font-size: ${theme.FONT_SIZE.SM};
    color: ${theme.COLORS['gray-100']};
  `}
  margin-bottom: 23px;
  text-align: center;
`;

export const BoxesContainer = styled.View`
  flex-direction: row;
`;
