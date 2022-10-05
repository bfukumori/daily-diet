import styled, { css } from 'styled-components/native';
import { DietVariant } from '@screens/Home';

type Props = {
  variant: DietVariant;
  isSelected: boolean;
  withMarginLeft?: boolean;
};

export const Container = styled.View`
  width: 100%;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.bold};
    font-size: ${theme.FONT_SIZE.SM};
    color: ${theme.COLORS['gray-200']};
  `}
  margin-bottom: 8px;
`;

export const OptionsContainer = styled.View`
  flex-direction: row;
`;

export const OptionWrapper = styled.Pressable<Props>`
  ${({ theme, isSelected, variant, withMarginLeft }) =>
    css`
      background-color: ${isSelected
        ? variant === 'inDiet'
          ? theme.COLORS['green-light']
          : theme.COLORS['red-light']
        : theme.COLORS['gray-600']};
      border-color: ${isSelected
        ? variant === 'inDiet'
          ? theme.COLORS['green-dark']
          : theme.COLORS['red-dark']
        : 'transparent'};
      margin-left: ${withMarginLeft ? '8px' : 0};
    `};
  border-width: 1px;
  border-style: solid;
  border-radius: 6px;
  padding: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const OptionIcon = styled.View<Props>`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${({ theme, variant }) =>
    variant === 'inDiet'
      ? theme.COLORS['green-dark']
      : theme.COLORS['red-dark']};
`;

export const OptionText = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.bold};
    font-size: ${theme.FONT_SIZE.SM};
    color: ${theme.COLORS['gray-100']};
  `}
  margin-left: 8px;
`;
