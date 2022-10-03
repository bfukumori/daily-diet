import { Variant } from '@screens/Home';
import { TouchableOpacityProps } from 'react-native';
import { Container, StyledIcon, StyledNumber, StyledText } from './styles';

type Props = TouchableOpacityProps & {
  value: string;
  text: string;
  variant: Variant;
};

export function Statistics({ value, text, variant, ...rest }: Props) {
  return (
    <Container variant={variant} {...rest}>
      <StyledIcon variant={variant} />
      <StyledNumber>{value}</StyledNumber>
      <StyledText>{text}</StyledText>
    </Container>
  );
}
