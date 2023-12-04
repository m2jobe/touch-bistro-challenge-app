import React, { useState } from 'react';
import { Text } from '@ui-kitten/components';
import { View } from 'react-native';
import styles from './styles';
import { discounts } from '@/services/modules/menu';
import { useDispatch, useSelector } from 'react-redux';
import { selectDiscounts, updateDiscounts } from '@/features/bill/billSlice';
import { DiscountTypeValue } from 'types/menu';
import { MultiSelect } from 'react-native-element-dropdown';

const DiscountMultiSelect = ({}: any) => {
  const dispatch = useDispatch();

  const [selectedItems, setSelectedItems] = useState<DiscountTypeValue[]>(
    useSelector(selectDiscounts),
  );

  const onDiscountSelect = (items: DiscountTypeValue[]) => {
    setSelectedItems(items);
    dispatch(updateDiscounts(items));
  };

  return (
    <View style={styles.mainView}>
      <View style={styles.container}>
        {discounts?.length ? (
          <MultiSelect
            testID="multi-select"
            data={discounts}
            labelField="label"
            valueField="value"
            placeholder="Select item"
            searchPlaceholder="Search..."
            value={selectedItems}
            onChange={onDiscountSelect}
          />
        ) : (
          <Text> No discounts available </Text>
        )}
      </View>
    </View>
  );
};

export default DiscountMultiSelect;
