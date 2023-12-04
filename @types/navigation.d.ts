import { NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

export type MainParamsList = {
  Home: undefined;
  Discounts: undefined;
};

export type ApplicationStackParamList = {
  Startup: undefined;
  Main: NavigatorScreenParams<MainParamsList>;
};

export type ApplicationScreenProps =
  StackScreenProps<ApplicationStackParamList>;

export type MainScreenProps<T extends keyof MainParamsList> =
  CompositeScreenProps<
    BottomTabScreenProps<HomeTabParamList, T>,
    ApplicationScreenProps<keyof ApplicationStackParamList>
  >;
