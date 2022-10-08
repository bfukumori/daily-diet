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
import { deleteMeal } from '@storage/meals/deleteMeal';
import { AppError } from '@utils/AppError';

export function Meal({ route, navigation }: RootStackScreenProps<'Meal'>) {
  const [modalVisible, setModalVisible] = useState(false);
  const { meal } = route.params;
  const { COLORS } = useTheme();

  function handleEditMeal() {
    navigation.navigate('EditMeal', { meal });
  }

  async function handleRemoveMeal(id: string, date: number) {
    try {
      await deleteMeal(id, date);
      setModalVisible(false);
      navigation.goBack();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Remover', error.message);
      } else {
        console.log(error);
        Alert.alert('Remover', 'Não foi possível remover a refeição.');
      }
    } finally {
      setModalVisible(false);
    }
  }

  return (
    <Container variant={meal.diet ? 'inDiet' : 'outDiet'}>
      <Modal
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
              onPress={() => handleRemoveMeal(meal.id, meal.date)}
            />
          </ButtonContainer>
        </CustomAlert>
      </Modal>
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
          onPress={() => setModalVisible(true)}
        />
      </Footer>
    </Container>
  );
}
