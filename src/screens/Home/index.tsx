import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Divider, TopNavigation, Layout } from '@ui-kitten/components';
import styles from './styles';
import { selectCartData, updateCart } from '@/features/bill/billSlice';
import { CartItem, MenuItemType } from 'types/menu';
import { MainScreenProps } from 'types/navigation';
import Checkout from '@/components/Checkout';
import Cart from '@/components/Cart';
import MenuItems from '@/components/MenuItems';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Home = ({ navigation }: MainScreenProps<'Navigation'>) => {
  const dispatch = useDispatch();
  const [cartData, setCartData] = useState(useSelector(selectCartData));

  const goToDiscountsPage = () => {
    navigation.navigate('Discounts');
  };

  const addToMenu = (item: MenuItemType) => () => {
    let cart = { ...cartData };

    if (cart[item.id]) {
      cart[item.id] = {
        ...cart[item.id],
        quantity: cart[item.id].quantity + 1,
      };
    } else {
      cart[item.id] = { item, quantity: 1 };
    }
    setCartData(cart);
    dispatch(updateCart(cart));
  };

  const removeFromMenu = (cartItem: CartItem) => () => {
    let cart = { ...cartData };
    delete cart[cartItem.item.id];

    setCartData(cart);
    dispatch(updateCart(cart));
  };

  return (
    <GestureHandlerRootView style={styles.gestureHandlerRootView}>
      <ScrollView style={styles.scrollView}>
        <TopNavigation title="Menu" alignment="center" />
        <Divider />
        <Layout style={styles.topContainer} level="1">
          <MenuItems addToMenu={addToMenu} />

          <View style={styles.cartAndCheckoutContainers}>
            <Button
              testID="discounts-button"
              onPress={goToDiscountsPage}
              size="tiny"
            >
              Discounts
            </Button>
            <Cart removeFromMenu={removeFromMenu} cartData={cartData} />

            <View style={styles.divider}>
              <Divider />
            </View>

            <Checkout />
          </View>
        </Layout>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default Home;
