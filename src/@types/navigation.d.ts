import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DataProps, Variant } from '@screens/Home';

export type RootStackParamList = {
  Home: undefined;
  Statistics: {
    variant: Variant;
    data: DataProps[];
  };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
