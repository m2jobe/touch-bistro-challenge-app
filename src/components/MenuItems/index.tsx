import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { categoriesWithItems } from '../../services/modules/menu';
import { Divider, Text } from '@ui-kitten/components';
import styles from './styles';
import { MenuItemType } from 'types/menu';

type Props = {
  addToMenu: (item: MenuItemType) => () => void;
};

const MenuItems = ({ addToMenu }: Props) => {
  return (
    <View style={styles.menuContainer}>
      {/* Move to items component */}
      {categoriesWithItems.map((menuItemCategory, index) => {
        return (
          <View
            testID={`category-id-${index}`}
            key={`category-id-${index}`}
            style={styles.categoryContainer}
          >
            <Text category="s1" status="info">
              {menuItemCategory.name}
            </Text>
            <Divider />
            {menuItemCategory.items.map(item => (
              <TouchableOpacity
                testID={`item-id-${item.id}`}
                key={`item-id-${item.id}`}
                onPress={addToMenu(item)}
                style={styles.itemContainer}
              >
                <Text style={styles.itemText} category="s2" status="primary">
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        );
      })}
    </View>
  );
};

export default MenuItems;
