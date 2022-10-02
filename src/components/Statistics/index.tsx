import { Container, StyledIcon, StyledNumber, StyledText } from './styles';

type Props = {
  value: string;
  text: string;
  variant?: 'primary' | 'secondary';
};

export function Statistics({ value, text, variant = 'primary' }: Props) {
  return (
    <Container variant={variant}>
      <StyledIcon variant={variant} />
      <StyledNumber>{value}</StyledNumber>
      <StyledText>{text}</StyledText>
    </Container>
  );
}
