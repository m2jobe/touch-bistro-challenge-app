import React from 'react';
import { MainScreenProps } from '../../../@types/navigation';
import { Button, TopNavigation } from '@ui-kitten/components';
import { View } from 'react-native';
import DiscountMultiSelect from '@/components/DiscountMultiSelect';

const Discounts = ({ navigation }: MainScreenProps<'Discount'>) => {
  const goBackToMainScreen = () => {
    navigation.navigate('Home');
  };

  return (
    <View>
      <TopNavigation title="Discounts" alignment="center" />

      <Button testID="go-back-button" size="tiny" onPress={goBackToMainScreen}>
        Go Back
      </Button>

      <DiscountMultiSelect />
    </View>
  );
};

export default Discounts;
