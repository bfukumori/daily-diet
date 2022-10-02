import { Image, SectionList } from 'react-native';
import { Plus } from 'phosphor-react-native';
import { useTheme } from 'styled-components/native';
import { Container, Header, HeaderTitle, Profile, Title } from './styles';
import logo from '@assets/logo.png';
import { Statistics } from '@components/Statistics';
import { Button } from '@components/Button';
import { ListItem } from '@components/ListItem';

export function Home() {
  const { COLORS } = useTheme();
  const DATA = [
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
      <Statistics value='90,86%' text='das refeições dentro da dieta' />
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
            variant={item.diet ? 'primary' : 'secondary'}
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
