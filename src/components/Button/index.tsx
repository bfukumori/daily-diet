import { TouchableOpacityProps } from 'react-native';
import { Container, Title } from './styles';

type Props = TouchableOpacityProps & {
  title: string;
  icon?: JSX.Element;
  variant?: 'primary' | 'secondary';
};

export function Button({ title, icon, variant = 'primary', ...rest }: Props) {
  return (
    <Container variant={variant} {...rest}>
      {icon}
      <Title variant={variant}>{title}</Title>
    </Container>
  );
}
