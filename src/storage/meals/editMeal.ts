import AsyncStorage from '@react-native-async-storage/async-storage';
import { Meal } from '@screens/Home';
import { MEAL_COLLECTION } from '@storage/storageConfig';
import { formatDate } from '@utils/formatDate';
import { getAllMeals } from './getAllMeals';

export async function editMeal(id: string, date: number, updatedMeal: Meal) {
  try {
    const storageData = await getAllMeals();
    const dataByDate = storageData.find(
      (item) => item.title === formatDate(date, 'date')
    );
    if (dataByDate) {
      const meal = dataByDate.data.find((item) => item.id === id);
      if (meal) {
        (meal.date = updatedMeal.date),
          (meal.description = updatedMeal.description),
          (meal.title = updatedMeal.title),
          (meal.diet = updatedMeal.diet);
      }
      await AsyncStorage.setItem(MEAL_COLLECTION, JSON.stringify(storageData));
    }
  } catch (error) {
    throw error;
  }
}
