import { DietVariant } from '@screens/Home';
import { Container, StyledNumber, StyledText } from './styles';

type Props = {
  variant?: DietVariant;
  value: number;
  title: string;
};

export function StatisticsBoxes({ value, title, variant }: Props) {
  return (
    <Container variant={variant}>
      <StyledNumber>{value}</StyledNumber>
      <StyledText>{title}</StyledText>
    </Container>
  );
}
