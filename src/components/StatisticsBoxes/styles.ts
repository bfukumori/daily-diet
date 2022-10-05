import { DietVariant } from '@screens/Home';
import styled, { css } from 'styled-components/native';

type Props = {
  variant?: DietVariant;
};

export const Container = styled.View<Props>`
  ${({ theme, variant }) => css`
    background-color: ${variant
      ? variant === 'inDiet'
        ? theme.COLORS['green-light']
        : theme.COLORS['red-light']
      : theme.COLORS['gray-600']};

    flex: ${!!variant ? 1 : 'none'};
    margin-left: ${variant === 'outDiet' ? '12px' : 0};
  `}

  padding: 16px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
`;

export const StyledNumber = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.bold};
    font-size: ${theme.FONT_SIZE['2MD']};
    color: ${theme.COLORS['gray-100']};
  `}
  margin-bottom:8px
`;

export const StyledText = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.regular};
    font-size: ${theme.FONT_SIZE.SM};
    color: ${theme.COLORS['gray-200']};
  `}
  text-align: center
`;
