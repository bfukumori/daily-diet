import { useEffect, useState } from 'react';
import { Image, SectionList } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Plus } from 'phosphor-react-native';
import logo from '@assets/logo.png';
import { Statistics } from '@components/Statistics';
import { Button } from '@components/Button';
import { ListItem } from '@components/ListItem';
import { formatPercentage } from '@utils/formatPercentage';
import { RootStackScreenProps } from 'src/@types/navigation';
import { Container, Header, HeaderTitle, Profile, Title } from './styles';

export interface DataProps {
  title: string;
  data: { title: string; time: string; diet: boolean }[];
}

export type Variant = 'inDiet' | 'outDiet';

export function Home({ navigation }: RootStackScreenProps<'Home'>) {
  const [variant, setVariant] = useState<Variant>('inDiet');
  const { COLORS } = useTheme();
  const DATA: DataProps[] = [
    {
      title: '12.08.22',
      data: [
        { title: 'X-tudo', time: '08:00', diet: false },
        { title: 'Whey protein', time: '16:00', diet: true },
        { title: 'Salada ceasar', time: '09:30', diet: true },
      ],
    },
    {
      title: '11.08.22',
      data: [{ title: 'Vitamina de banana', time: '20:00', diet: true }],
    },
    {
      title: '10.08.22',
      data: [
        { title: 'Wrap', time: '12:30', diet: true },
        { title: 'McDonalds', time: '11:25', diet: false },
      ],
    },
  ];

  const totalMeals = DATA.map((meal) => meal.data).flat();
  const mealsInDiet = totalMeals.filter((meal) => meal.diet);
  const percentageInDiet = mealsInDiet.length / totalMeals.length;
  const formattedPercentageInDiet = formatPercentage(
    mealsInDiet.length,
    totalMeals.length
  );

  function handleGoToStatisticsPage() {
    navigation.navigate('Statistics', {
      variant,
      data: DATA,
    });
  }

  useEffect(() => {
    if (percentageInDiet <= 0.5) {
      setVariant('outDiet');
    } else {
      setVariant('inDiet');
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
        onPress={handleGoToStatisticsPage}
        variant={variant}
      />
      <Title>Refeições</Title>
      <Button
        title='Nova refeição'
        icon={<Plus size={18} color={COLORS.white} />}
      />
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item.title + index}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            time={item.time}
            variant={item.diet ? 'inDiet' : 'outDiet'}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <HeaderTitle>{title}</HeaderTitle>
        )}
        showsVerticalScrollIndicator={false}
        fadingEdgeLength={1000}
      />
    </Container>
  );
}
