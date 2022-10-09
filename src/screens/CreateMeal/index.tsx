import { useId, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { RootStackScreenProps } from 'src/@types/navigation';
import { Container, Form, InputContainer, Footer } from './styles';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { Radio } from '@components/Radio';
import { Header } from '@components/Header';
import { formatDate } from '@utils/formatDate';
import { AppError } from '@utils/AppError';
import { createNewMeal } from '@storage/meals/createNewMeal';

export function CreateMeal({ navigation }: RootStackScreenProps<'CreateMeal'>) {
  const [mealName, setMealName] = useState('');
  const [mealDescription, setMealDescription] = useState('');
  const [dietOption, setDietOption] = useState<string | null>(null);
  const [date, setDate] = useState<number>(new Date().getTime());

  const mealId = useId();

  function handleDietOption(option: string) {
    setDietOption(option);
  }

  function onChange(event: DateTimePickerEvent, selectedDate?: Date) {
    const formatedDate = selectedDate!.getTime();
    setDate(formatedDate);
  }

  function showMode(mode: 'date' | 'time') {
    DateTimePickerAndroid.open({
      value: new Date(date),
      onChange,
      mode,
      is24Hour: true,
    });
  }

  async function handleCreateMeal() {
    if (mealName.trim().length === 0 || mealDescription.trim().length === 0) {
      return Alert.alert('Nova Refeição', 'Preencha o nome e a descrição.');
    }
    if (!dietOption) {
      return Alert.alert(
        'Nova Refeição',
        'Selecione se está dentro ou fora da dieta.'
      );
    }
    const newMeal = {
      id: mealId,
      title: mealName,
      description: mealDescription,
      date: date,
      diet: dietOption === 'Sim' ? true : false,
    };

    try {
      await createNewMeal(newMeal);
      navigation.navigate('Home');
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Criar refeição', error.message);
      } else {
        console.log(error);
        Alert.alert('Criar refeição', 'Não foi possível criar a refeição.');
      }
    }

    navigation.navigate('Feedback', {
      variant: dietOption === 'Sim' ? 'inDiet' : 'outDiet',
    });
  }

  return (
    <KeyboardAvoidingView behavior='position'>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header title='Nova refeição' />
          <Form>
            <Input
              title='Nome'
              onChangeText={setMealName}
              value={mealName}
              autoCorrect={false}
            />
            <Input
              title='Descrição'
              onChangeText={setMealDescription}
              value={mealDescription}
            />
            <InputContainer>
              <Input
                title='Data'
                twoColumns
                onPressIn={() => showMode('date')}
                defaultValue={formatDate(date, 'date')}
              />
              <Input
                title='Hora'
                twoColumns
                withLeftMargin
                onPressIn={() => showMode('time')}
                defaultValue={formatDate(date, 'time')}
              />
            </InputContainer>
            <InputContainer>
              <Radio
                title='Está dentro da dieta?'
                options={['Sim', 'Não']}
                onSelect={handleDietOption}
              />
            </InputContainer>
          </Form>
          <Footer>
            <Button title='Cadastrar refeição' onPress={handleCreateMeal} />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
