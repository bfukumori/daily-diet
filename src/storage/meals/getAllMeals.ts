import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataProps } from '@screens/Home';
import { MEAL_COLLECTION } from '@storage/storageConfig';

export async function getAllMeals() {
  try {
    const storageData = await AsyncStorage.getItem(MEAL_COLLECTION);
    const data: DataProps[] = storageData ? JSON.parse(storageData) : [];
    return data;
  } catch (error) {
    throw error;
  }
}
