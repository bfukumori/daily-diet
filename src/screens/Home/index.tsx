import { useEffect, useState, useCallback } from 'react';
import { Image, SectionList, Alert } from 'react-native';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MEAL_COLLECTION } from '@storage/storageConfig';
import { AppError } from '@utils/AppError';
import { useFocusEffect } from '@react-navigation/native';

export type DietVariant = 'inDiet' | 'outDiet';

export type Meal = {
  id: string;
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
  const [data, setData] = useState<DataProps[]>([]);
  const [diet, setDiet] = useState<DietVariant>('inDiet');
  const { COLORS } = useTheme();

  const meals = data.map((meal) => meal.data).flat();

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
      data,
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

  useFocusEffect(
    useCallback(() => {
      async function fetchMeals() {
        try {
          const storageData = await AsyncStorage.getItem(MEAL_COLLECTION);
          const parsedData = storageData ? JSON.parse(storageData) : [];
          setData(parsedData);
        } catch (error) {
          if (error instanceof AppError) {
            Alert.alert('Dados', error.message);
          } else {
            console.log(error);
            Alert.alert('Dados', 'Não foi possível recuperar os dados.');
          }
        }
      }
      fetchMeals();
    }, [])
  );

  // const clearAll = async () => {
  //   try {
  //     await AsyncStorage.clear();
  //   } catch (e) {
  //     // clear error
  //   }

  //   console.log('Done.');
  // };
  // clearAll();
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
        value={totalMeals > 0 ? formattedPercentageInDiet : '0,00%'}
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
        sections={data}
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
        fadingEdgeLength={300}
      />
    </Container>
  );
}
