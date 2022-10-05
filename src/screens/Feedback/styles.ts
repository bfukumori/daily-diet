import styled, { css } from 'styled-components/native';
import { Image, ImageProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DietVariant } from '@screens/Home';

type Props = {
  variant: DietVariant;
};

export const Container = styled(SafeAreaView)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS['gray-700']};
`;

export const Heading = styled.Text<Props>`
  ${({ theme, variant }) => css`
    color: ${variant === 'inDiet'
      ? theme.COLORS['green-dark']
      : theme.COLORS['red-dark']};
    font-family: ${theme.FONT_FAMILY.bold};
    font-size: ${theme.FONT_SIZE['2MD']};
  `}
  margin-bottom: 8px;
`;

export const SubHeading = styled.View``;

export const Message = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS['gray-100']};
    font-family: ${theme.FONT_FAMILY.regular};
    font-size: ${theme.FONT_SIZE.MD};
  `}
  text-align: center;
`;

export const Strong = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.bold};
`;

export const StyledImage = styled(Image as new (props: ImageProps) => Image)`
  margin: 40px auto 32px;
`;
