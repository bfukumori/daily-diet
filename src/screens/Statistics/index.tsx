import { StatisticsBoxes } from '@components/StatisticsBoxes';
import { formatPercentage } from '@utils/formatPercentage';
import { RootStackScreenProps } from 'src/@types/navigation';
import {
  BoxesContainer,
  Container,
  Content,
  Header,
  IconContainer,
  StyledIcon,
  StyledNumber,
  StyledText,
  Title,
} from './styles';

export function Statistics({
  route,
  navigation,
}: RootStackScreenProps<'Statistics'>) {
  const { variant, data } = route.params;

  const totalMeals = data.map((meal) => meal.data).flat();
  const mealsInDiet = totalMeals.filter((meal) => meal.diet);
  const mealsOutDiet = totalMeals.length - mealsInDiet.length;
  const formattedPercentageInDiet = formatPercentage(
    mealsInDiet.length,
    totalMeals.length
  );

  function handleGoBack() {
    navigation.goBack();
  }
  return (
    <Container variant={variant}>
      <Header variant={variant}>
        <IconContainer onPress={handleGoBack}>
          <StyledIcon variant={variant} />
        </IconContainer>
        <StyledNumber>{formattedPercentageInDiet}</StyledNumber>
        <StyledText>das refeições dentro da dieta</StyledText>
      </Header>
      <Content>
        <Title>Estatísticas gerais</Title>
        <StatisticsBoxes
          value={22}
          title='melhor sequência de pratos dentro da dieta'
        />
        <StatisticsBoxes
          value={totalMeals.length}
          title='refeições registradas'
        />
        <BoxesContainer>
          <StatisticsBoxes
            variant='inDiet'
            value={mealsInDiet.length}
            title='refeições dentro da dieta'
          />
          <StatisticsBoxes
            variant='outDiet'
            value={mealsOutDiet}
            title='refeições fora da dieta'
          />
        </BoxesContainer>
      </Content>
    </Container>
  );
}
