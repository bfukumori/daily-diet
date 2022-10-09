import { SafeAreaView } from 'react-native-safe-area-context';
import styled, { css } from 'styled-components/native';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS['gray-700']};
  padding: 0 24px;
`;

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 33px 0;
`;

export const ProfileContainer = styled.Pressable`
  width: 40px;
  height: 40px;
  border: 2px solid ${({ theme }) => theme.COLORS['gray-200']};
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

export const Profile = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.regular};
    font-size: ${theme.FONT_SIZE.MD};
    color: ${theme.COLORS['gray-100']};
  `}
  margin-top: 40px;
  margin-bottom: 8px;
`;

export const ListHeaderTitle = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.bold};
    font-size: ${theme.FONT_SIZE.LG};
    color: ${theme.COLORS['gray-100']};
  `}
  margin-bottom:16px;
  margin-top: 32px;
`;
