import { useState } from 'react';
import { Alert, Modal } from 'react-native';
import { useTheme } from 'styled-components/native';
import { PencilSimpleLine, Trash } from 'phosphor-react-native';
import { RootStackScreenProps } from 'src/@types/navigation';
import { Button } from '@components/Button';
import { CustomAlert } from '@components/CustomAlert';
import { Header } from '@components/Header';
import {
  Container,
  Content,
  Title,
  Description,
  Subtitle,
  Time,
  Diet,
  Icon,
  Message,
  Footer,
  ButtonContainer,
} from './styles';
import { formatDate } from '@utils/formatDate';

export function Meal({ route, navigation }: RootStackScreenProps<'Meal'>) {
  // const [modalVisible, setModalVisible] = useState(false);
  const { meal } = route.params;
  const { COLORS } = useTheme();

  function handleEditMeal() {
    navigation.navigate('EditMeal', { meal });
  }

  // function handleRemoveMealWithCustomModal() {
  //   setModalVisible(true);
  // }

  // function removeMealWithCustomModal() {
  //   setModalVisible(false);
  //   console.log('Excluído');
  // }

  function handleRemoveMeal() {
    Alert.alert('Remover', 'Deseja realmente excluir o registro da refeição?', [
      {
        style: 'cancel',
        text: 'Cancelar',
      },
      {
        style: 'default',
        text: 'Sim, excluir',
        onPress: () => console.log('Excluído'),
      },
    ]);
  }

  return (
    <Container variant={meal.diet ? 'inDiet' : 'outDiet'}>
      {/* <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        statusBarTranslucent
        onRequestClose={() => setModalVisible(false)}
      >
        <CustomAlert title='Deseja realmente excluir o registro da refeição?'>
          <ButtonContainer>
            <Button
              title='Cancelar'
              variant='light'
              onPress={() => setModalVisible(false)}
            />
            <Button
              title='Sim ,excluir'
              style={{ marginLeft: 12 }}
              onPress={removeMealWithCustomModal}
            />
          </ButtonContainer>
        </CustomAlert>
      </Modal> */}
      <Header title='Refeição' variant={meal.diet ? 'inDiet' : 'outDiet'} />
      <Content>
        <Title>{meal.title}</Title>
        <Description>{meal.description}</Description>
        <Subtitle>Data e hora</Subtitle>
        <Time>{`${formatDate(meal.date, 'date')} às ${formatDate(
          meal.date,
          'time'
        )}`}</Time>
        <Diet>
          <Icon variant={meal.diet ? 'inDiet' : 'outDiet'} />
          <Message>{meal.diet ? 'dentro da dieta' : 'fora da dieta'}</Message>
        </Diet>
      </Content>
      <Footer>
        <Button
          icon={
            <PencilSimpleLine size={24} color={COLORS.white} weight='light' />
          }
          title='Editar refeição'
          style={{ marginBottom: 8 }}
          onPress={handleEditMeal}
        />
        <Button
          icon={<Trash size={24} color={COLORS['gray-100']} weight='light' />}
          title='Excluir refeição'
          variant='light'
          onPress={handleRemoveMeal}
        />
      </Footer>
    </Container>
  );
}
