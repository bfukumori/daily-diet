import { useNavigation } from '@react-navigation/native';
import { DietVariant } from '@screens/Home';
import { Container, IconContainer, StyledIcon, Title } from './styles';

type Props = {
  title: string;
  variant?: DietVariant;
};

export function Header({ title, variant }: Props) {
  const { goBack } = useNavigation();

  function handleGoBack() {
    goBack();
  }

  return (
    <Container variant={variant}>
      <IconContainer onPress={handleGoBack}>
        <StyledIcon />
      </IconContainer>
      <Title>{title}</Title>
    </Container>
  );
}
