import { RootStackScreenProps } from 'src/@types/navigation';
import {
  Container,
  Heading,
  Message,
  Strong,
  StyledImage,
  SubHeading,
} from './styles';
import successImg from '@assets/diet_success.png';
import failImg from '@assets/diet_fail.png';
import { Button } from '@components/Button';

export function Feedback({
  navigation,
  route,
}: RootStackScreenProps<'Feedback'>) {
  const { variant } = route.params;

  function handleGoToHome() {
    navigation.navigate('Home');
  }

  return (
    <Container>
      <Heading variant={variant}>
        {variant === 'inDiet' ? 'Continue assim!' : 'Que pena!'}
      </Heading>
      {variant === 'inDiet' ? (
        <SubHeading>
          <Message>
            Você continua
            <Strong> dentro da dieta.</Strong> Muito bem!
          </Message>
        </SubHeading>
      ) : (
        <SubHeading>
          <Message>
            Você
            <Strong> saiu da dieta</Strong> dessa vez, mas continue se
            esforçando e não desista!
          </Message>
        </SubHeading>
      )}
      <StyledImage source={variant === 'inDiet' ? successImg : failImg} />
      <Button title='Ir para a página inicial' onPress={handleGoToHome} />
    </Container>
  );
}
