import { useEffect, useState } from 'react';
import { Image, SectionList } from 'react-native';
import { useTheme } from 'styled-components/native';
import { RootStackScreenProps } from 'src/@types/navigation';
import { formatPercentage } from '@utils/formatPercentage';
import { Plus } from 'phosphor-react-native';
import logo from '@assets/logo.png';
import { Container, Header, ListHeaderTitle, Profile, Title } from './styles';
import { Statistics } from '@components/Statistics';
import { Button } from '@components/Button';
import { ListItem } from '@components/ListItem';
import { formatDate } from '@utils/formatDate';

export type DietVariant = 'inDiet' | 'outDiet';

export type Meal = {
  title: string;
  date: number;
  description: string;
  diet: boolean;
};

export interface DataProps {
  title: string;
  data: Meal[];
}

export function Home({ navigation }: RootStackScreenProps<'Home'>) {
  const [diet, setDiet] = useState<DietVariant>('inDiet');
  const { COLORS } = useTheme();
  const DATA: DataProps[] = [
    {
      title: '12.08.22',
      data: [
        {
          title: 'X-tudo',
          description: 'loremloremrmeomroemoemro',
          date: new Date().getTime(),
          diet: true,
        },
        {
          title: 'X-tudo',
          description: 'loremloremrmeomroemoemro',
          date: new Date().getTime(),
          diet: true,
        },
        {
          title: 'X-tudo',
          description: 'loremloremrmeomroemoemro',
          date: new Date().getTime(),
          diet: true,
        },
      ],
    },
    {
      title: '11.08.22',
      data: [
        {
          title: 'X-tudo',
          description: 'loremloremrmeomroemoemro',
          date: new Date().getTime(),
          diet: true,
        },
      ],
    },
    {
      title: '10.08.22',
      data: [
        {
          title: 'X-tudo',
          description: 'loremloremrmeomroemoemro',
          date: new Date().getTime(),
          diet: false,
        },
        {
          title: 'X-tudo',
          description: 'loremloremrmeomroemoemro',
          date: new Date().getTime(),
          diet: false,
        },
      ],
    },
  ];

  const meals = DATA.map((meal) => meal.data).flat();

  const totalMealsInDiet = meals.filter((meal) => meal.diet).length;
  const totalMeals = meals.length;

  const percentageInDiet = totalMealsInDiet / totalMeals;

  const formattedPercentageInDiet = formatPercentage(
    totalMealsInDiet,
    totalMeals
  );

  function handleGoToStatisticsScreen() {
    navigation.navigate('Statistics', {
      diet,
      data: DATA,
    });
  }

  function handleCreateMeal() {
    navigation.navigate('CreateMeal');
  }

  function handleGoToMealScreen(meal: Meal) {
    navigation.navigate('Meal', { meal });
  }

  useEffect(() => {
    if (percentageInDiet <= 0.5) {
      setDiet('outDiet');
    } else {
      setDiet('inDiet');
    }
  }, [percentageInDiet]);

  return (
    <Container>
      <Header>
        <Image source={logo} />
        <Profile
          source={{
            uri: 'https://github.com/bfukumori.png',
          }}
        />
      </Header>
      <Statistics
        value={formattedPercentageInDiet}
        text='das refeições dentro da dieta'
        onPress={handleGoToStatisticsScreen}
        variant={diet}
      />
      <Title>Refeições</Title>
      <Button
        title='Nova refeição'
        icon={<Plus size={18} color={COLORS.white} />}
        onPress={handleCreateMeal}
      />
      <SectionList
        sections={DATA}
        keyExtractor={(meal, index) => meal.title + index}
        renderItem={({ item: meal }) => (
          <ListItem
            title={meal.title}
            time={formatDate(meal.date, 'time')}
            variant={meal.diet ? 'inDiet' : 'outDiet'}
            onPress={() => handleGoToMealScreen(meal)}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <ListHeaderTitle>{title}</ListHeaderTitle>
        )}
        showsVerticalScrollIndicator={false}
        fadingEdgeLength={1000}
        contentContainerStyle={{ paddingBottom: 90 }}
      />
    </Container>
  );
}
