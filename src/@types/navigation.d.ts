import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DataProps, DietVariant, Meal } from '@screens/Home';

export type RootStackParamList = {
  Home: undefined;
  Statistics: {
    diet: DietVariant;
    data: DataProps[];
  };
  CreateMeal: undefined;
  Feedback: { variant: DietVariant };
  Meal: { meal: Meal };
  EditMeal: { meal: Meal };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
