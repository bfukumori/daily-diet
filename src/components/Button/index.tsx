import { TouchableOpacityProps } from 'react-native';
import { Container, Title } from './styles';

export type ButtonType = 'dark' | 'light';

type Props = TouchableOpacityProps & {
  title: string;
  icon?: JSX.Element;
  variant?: ButtonType;
};

export function Button({ title, icon, variant = 'dark', ...rest }: Props) {
  return (
    <Container variant={variant} {...rest}>
      {icon}
      <Title variant={variant} hasIcon={!!icon}>
        {title}
      </Title>
    </Container>
  );
}
