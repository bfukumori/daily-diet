import { TouchableOpacityProps } from 'react-native';
import { Container, StyledIcon, StyledNumber, StyledText } from './styles';

export type Variant = 'inDiet' | 'outDiet';

type Props = TouchableOpacityProps & {
  value: string;
  text: string;
  variant?: Variant;
};

export function Statistics({ value, text, variant, ...rest }: Props) {
  return (
    <Container variant={variant} {...rest}>
      {variant && <StyledIcon variant={variant} />}
      <StyledNumber>{value}</StyledNumber>
      <StyledText>{text}</StyledText>
    </Container>
  );
}
