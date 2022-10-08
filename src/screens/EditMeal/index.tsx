import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { RootStackScreenProps } from 'src/@types/navigation';
import { Container, Footer, Form, InputContainer } from './styles';

import { Header } from '@components/Header';
import { Input } from '@components/Input';
import { Radio } from '@components/Radio';
import { formatDate } from '@utils/formatDate';
import { Button } from '@components/Button';
import { AppError } from '@utils/AppError';
import { editMeal } from '@storage/meals/editMeal';

export function EditMeal({
  navigation,
  route,
}: RootStackScreenProps<'EditMeal'>) {
  const { meal } = route.params;
  const [mealName, setMealName] = useState(meal.title);
  const [mealDescription, setMealDescription] = useState(meal.description);
  const [dietOption, setDietOption] = useState<string>(
    meal.diet ? 'Sim' : 'Não'
  );
  const [date, setDate] = useState<number>(meal.date);

  function handleDietOption(option: string) {
    setDietOption(option);
  }

  function onChange(event: DateTimePickerEvent, selectedDate?: Date) {
    const formatedDate = selectedDate!.getTime();
    setDate(formatedDate);
  }

  function showMode(mode: 'date' | 'time') {
    DateTimePickerAndroid.open({
      value: new Date(date!),
      onChange,
      mode,
      is24Hour: true,
    });
  }

  async function handleEditMeal() {
    if (mealName.trim().length === 0 || mealDescription.trim().length === 0) {
      return Alert.alert('Nova Refeição', 'Preencha o nome e a descrição.');
    }
    if (!dietOption) {
      return Alert.alert(
        'Nova Refeição',
        'Selecione se está dentro ou fora da dieta.'
      );
    }
    const updatedMeal = {
      id: meal.id,
      title: mealName,
      description: mealDescription,
      date: date,
      diet: dietOption === 'Sim' ? true : false,
    };

    try {
      await editMeal(meal.id, meal.date, updatedMeal);
      navigation.navigate('Meal', { meal: updatedMeal });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Editar', error.message);
      } else {
        Alert.alert('Editar', 'Não foi possível editar a refeição.');
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior='position'>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header title='Editar refeição' />
          <Form>
            <Input
              title='Nome'
              onChangeText={setMealName}
              value={mealName}
              autoCorrect={false}
              defaultValue={mealName}
            />
            <Input
              title='Descrição'
              onChangeText={setMealDescription}
              value={mealDescription}
              defaultValue={mealDescription}
            />
            <InputContainer>
              <Input
                title='Data'
                twoColumns
                onPressIn={() => showMode('date')}
                defaultValue={formatDate(date!, 'date')}
              />
              <Input
                title='Hora'
                twoColumns
                withLeftMargin
                onPressIn={() => showMode('time')}
                defaultValue={formatDate(date!, 'time')}
              />
            </InputContainer>
            <InputContainer>
              <Radio
                title='Está dentro da dieta?'
                options={['Sim', 'Não']}
                onSelect={handleDietOption}
                prevValue={meal.diet ? 'Sim' : 'Não'}
              />
            </InputContainer>
          </Form>
          <Footer>
            <Button title='Salvar alteração' onPress={handleEditMeal} />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
