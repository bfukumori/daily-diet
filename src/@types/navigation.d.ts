import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DataProps, DietVariant } from '@screens/Home';

export type RootStackParamList = {
  Home: undefined;
  Statistics: {
    diet: DietVariant;
    data: DataProps[];
  };
  CreateMeal: undefined;
  Feedback: { variant: DietVariant };
  Meal: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
