import { useEffect, useState, useCallback } from 'react';
import { Image, SectionList, Alert } from 'react-native';
import { useTheme } from 'styled-components/native';
import { useFocusEffect } from '@react-navigation/native';
import { Camera, Plus } from 'phosphor-react-native';
import logo from '@assets/logo.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackScreenProps } from 'src/@types/navigation';
import { formatPercentage } from '@utils/formatPercentage';
import { formatDate } from '@utils/formatDate';
import { AppError } from '@utils/AppError';
import { MEAL_COLLECTION } from '@storage/storageConfig';
import { Statistics } from '@components/Statistics';
import { Button } from '@components/Button';
import { ListItem } from '@components/ListItem';
import { EmptyList } from '@components/EmptyList';
import {
  Container,
  Header,
  ListHeaderTitle,
  Profile,
  ProfileContainer,
  Title,
} from './styles';
import * as ImagePicker from 'expo-image-picker';

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
  const [image, setImage] = useState<string | null>(null);
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

  async function handlePickProfileImage() {
    const profileImg = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!profileImg.cancelled) {
      setImage(profileImg.uri);
    }
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

  return (
    <Container>
      <Header>
        <Image source={logo} />
        <ProfileContainer onPress={handlePickProfileImage}>
          {image ? (
            <Profile
              source={{
                uri: { image },
              }}
            />
          ) : (
            <Camera />
          )}
        </ProfileContainer>
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
        ListEmptyComponent={EmptyList}
      />
    </Container>
  );
}
