import { useState } from 'react';
import { Alert, KeyboardAvoidingView } from 'react-native';
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { RootStackScreenProps } from 'src/@types/navigation';
import { Container, Form, InputContainer } from './styles';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { Radio } from '@components/Radio';
import { Header } from '@components/Header';

export function CreateMeal({ navigation }: RootStackScreenProps<'CreateMeal'>) {
  const [mealName, setMealName] = useState('');
  const [mealDescription, setMealDescription] = useState('');
  const [dietOption, setDietOption] = useState<string | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());

  function handleDietOption(option: string) {
    setDietOption(option);
  }

  function onChange(event: DateTimePickerEvent, selectedDate?: Date) {
    setDate(selectedDate);
  }

  function showMode(mode: 'date' | 'time') {
    DateTimePickerAndroid.open({
      value: new Date(date!),
      onChange,
      mode,
      is24Hour: true,
    });
  }

  function handleCreateMeal() {
    if (mealName.trim().length === 0 || mealDescription.trim().length === 0) {
      return Alert.alert('Nova Refeição', 'Preencha o nome e a descrição.');
    }
    if (!dietOption) {
      return Alert.alert(
        'Nova Refeição',
        'Selecione se está dentro ou fora da dieta.'
      );
    }
    const meal = {
      mealName,
      mealDescription,
      date: date?.toLocaleDateString('pt-BR'),
      time: date?.toLocaleTimeString('pt-BR'),
      diet: dietOption === 'Sim' ? true : false,
    };
    console.log(meal);
    navigation.navigate('Feedback', {
      variant: dietOption === 'Sim' ? 'inDiet' : 'outDiet',
    });
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
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
              defaultValue={date?.toLocaleDateString('pt-BR')}
            />
            <Input
              title='Hora'
              twoColumns
              withLeftMargin
              onPressIn={() => showMode('time')}
              defaultValue={date?.toLocaleTimeString('pt-BR')}
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
      </Container>
      <Button
        title='Cadastrar refeição'
        onPress={handleCreateMeal}
        style={{ marginHorizontal: 24 }}
      />
    </KeyboardAvoidingView>
  );
}
