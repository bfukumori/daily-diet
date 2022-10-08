import { ForkKnife } from 'phosphor-react-native';
import { useTheme } from 'styled-components/native';
import { Container, Message } from './styles';

export function EmptyList() {
  const { COLORS } = useTheme();
  return (
    <Container>
      <ForkKnife size={50} color={COLORS['gray-300']} />
      <Message>
        Sua lista está vazia!{'\n'} Que tal adicionar uma refeição?
      </Message>
    </Container>
  );
}
