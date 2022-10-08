import { StatisticsBoxes } from '@components/StatisticsBoxes';
import { bestStreakInDiet } from '@utils/bestStreakInDiet';
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
  const { diet, data } = route.params;
  const meals = data.map((meal) => meal.data).flat();

  const bestStreak = bestStreakInDiet(meals);

  const totalMeals = meals.length;
  const totalMealsInDiet = meals.filter((meal) => meal.diet).length;
  const totalMealsOutDiet = meals.length - totalMealsInDiet;

  const formattedPercentageInDiet = formatPercentage(
    totalMealsInDiet,
    totalMeals
  );

  function handleGoBack() {
    navigation.goBack();
  }
  return (
    <Container variant={diet}>
      <Header variant={diet}>
        <IconContainer onPress={handleGoBack}>
          <StyledIcon variant={diet} />
        </IconContainer>
        <StyledNumber>
          {totalMeals > 0 ? formattedPercentageInDiet : '0,00%'}
        </StyledNumber>
        <StyledText>das refeições dentro da dieta</StyledText>
      </Header>
      <Content>
        <Title>Estatísticas gerais</Title>
        <StatisticsBoxes
          value={bestStreak}
          title='melhor sequência de pratos dentro da dieta'
        />
        <StatisticsBoxes value={totalMeals} title='refeições registradas' />
        <BoxesContainer>
          <StatisticsBoxes
            variant='inDiet'
            value={totalMealsInDiet}
            title='refeições dentro da dieta'
          />
          <StatisticsBoxes
            variant='outDiet'
            value={totalMealsOutDiet}
            title='refeições fora da dieta'
          />
        </BoxesContainer>
      </Content>
    </Container>
  );
}
