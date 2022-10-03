import { Variant } from '@screens/Home';
import styled, { css } from 'styled-components/native';

type Props = {
  variant: 'neutral' | Variant;
};

export const Container = styled.View<Props>`
  ${({ theme, variant }) => css`
    background-color: ${(variant === 'neutral' && theme.COLORS['gray-600']) ||
    (variant === 'inDiet' && theme.COLORS['green-light']) ||
    (variant === 'outDiet' && theme.COLORS['red-light'])};
    flex: ${variant === 'neutral' ? 'none' : '1'};
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
    font-size: ${theme.FONT_SIZE.XL};
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
`;
