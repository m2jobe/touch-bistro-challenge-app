import {
  selectDiscount,
  selectFinalTotal,
  selectSubtotal,
  selectTax,
} from '@/features/bill/billSlice';
import { Text } from '@ui-kitten/components';
import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

type Props = {};

const Checkout = ({}: Props) => {
  const subTotal = useSelector(selectSubtotal).toFixed(2);
  const tax = useSelector(selectTax).toFixed(2);
  const discount = useSelector(selectDiscount).toFixed(2);
  const finalTotal = useSelector(selectFinalTotal).toFixed(2);

  return (
    <View>
      <Text testID="sub-total" category="s1">
        Subtotal: ${subTotal}
      </Text>
      <Text testID="discounts" category="s1">
        Discounts: ${discount}
      </Text>
      <Text testID="tax" category="s1">
        Tax: ${tax}
      </Text>
      <Text testID="total" category="s1">
        Total: ${finalTotal}
      </Text>
    </View>
  );
};

Checkout.defaultProps = {};

export default Checkout;
