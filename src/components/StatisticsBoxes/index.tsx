import { Variant } from '@screens/Home';
import { Container, StyledNumber, StyledText } from './styles';

type Props = {
  variant?: 'neutral' | Variant;
  value: number;
  title: string;
};

export function StatisticsBoxes({ value, title, variant = 'neutral' }: Props) {
  return (
    <Container variant={variant}>
      <StyledNumber>{value}</StyledNumber>
      <StyledText>{title}</StyledText>
    </Container>
  );
}
