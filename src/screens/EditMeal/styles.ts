import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Container = styled(SafeAreaView)`
  background-color: ${({ theme }) => theme.COLORS['gray-500']};
`;

export const Form = styled.View`
  background-color: ${({ theme }) => theme.COLORS['gray-700']};
  padding: 28px 24px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
`;

export const InputContainer = styled.View`
  flex-direction: row;
`;

export const Footer = styled.View`
  background-color: ${({ theme }) => theme.COLORS['gray-700']};
  padding: 0 24px;
`;
