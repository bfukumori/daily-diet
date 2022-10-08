import { Meal } from '@screens/Home';

export function bestStreakInDiet(meals: Meal[]) {
  let streak = 0;
  let bestStreak = 0;
  meals.forEach((meal) => {
    if (meal.diet) {
      streak++;
    } else {
      streak = 0;
    }
    if (streak > bestStreak) {
      bestStreak = streak;
    }
  });
  return bestStreak;
}
