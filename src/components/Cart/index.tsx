import React from 'react';
import { Button, Divider, Text, Icon } from '@ui-kitten/components';
import styles from './styles';
import { CartItems, CartItem } from 'types/menu';
import { Swipeable } from 'react-native-gesture-handler';
import { View } from 'react-native';

type Props = {
  removeFromMenu: (cartItem: CartItem) => () => void;
  cartData: CartItems;
};
const Cart = ({ removeFromMenu, cartData }: Props) => {
  const cartDataArray = Object.values(cartData);

  const renderDeleteText = () => <Text style={styles.deleteText}>Delete</Text>;

  return (
    <View style={styles.cartContainer}>
      <Text category="s1"> Cart</Text>

      <Divider />
      {cartDataArray?.length ? (
        cartDataArray.map((cartItem, index) => (
          <Swipeable
            key={`cartItem-id-${index}`}
            friction={2}
            enableTrackpadTwoFingerGesture
            leftThreshold={30}
            rightThreshold={40}
            renderLeftActions={renderDeleteText}
            onSwipeableWillOpen={removeFromMenu(cartItem)}
          >
            <View
              testID={`cartItem-id-${index}`}
              style={styles.cartItemContainer}
            >
              <View style={styles.cartItemTitleContainer}>
                <Text category="p2" status="primary">
                  {cartItem.item.name}
                </Text>
                <Button
                  testID={`item-id-${index}`}
                  style={styles.cartItemDeleteButton}
                  appearance="ghost"
                  status="danger"
                  size="small"
                  accessoryLeft={<Icon name="trash-outline" />}
                  onPress={removeFromMenu(cartItem)}
                />
              </View>

              <Text category="p2" status="primary">
                Price: ${cartItem.item.price}
              </Text>
              <Divider />
              <Text category="p2" status="primary">
                Quantity: {cartItem.quantity}
              </Text>
            </View>
            <Divider />
          </Swipeable>
        ))
      ) : (
        <Text style={styles.cartItemContainer} category="p2">
          Empty
        </Text>
      )}
    </View>
  );
};

export default Cart;
