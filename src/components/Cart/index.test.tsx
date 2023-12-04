import React from 'react';
import { userEvent, render, screen } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import Cart from '.';
import { categories } from '@/services/modules/menu';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { CartItem, CartItems, MenuItemType } from 'types/menu';
import { UserEventInstance } from '@testing-library/react-native/build/user-event/setup';

let mockReturnFromMenu: (item: CartItem) => () => void;
let mockCartData: CartItems;
let mockMenuItem: MenuItemType;
let mockCartItem: CartItem;
let user: UserEventInstance;

beforeEach(() => {
  mockReturnFromMenu = jest.fn();
  mockMenuItem = {
    id: 4,
    name: 'Burger',
    category: categories.mains,
    price: 9.99,
  };
  mockCartItem = { quantity: 0, item: mockMenuItem };
  mockCartData = { [mockCartItem.item.id]: mockCartItem };
  user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
});

describe('when Cart is called', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider mapping={eva.mapping} theme={eva.light}>
          <Cart removeFromMenu={mockReturnFromMenu} cartData={mockCartData} />
        </ApplicationProvider>
      </Provider>,
    );

    expect(screen.queryByTestId('cartItem-id-0')).toBeOnTheScreen();
  });

  describe('when the delete button is pressed', () => {
    it('should remove the item from the cart', () => {
      jest.useFakeTimers();

      render(
        <Provider store={store}>
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider mapping={eva.mapping} theme={eva.light}>
            <Cart removeFromMenu={mockReturnFromMenu} cartData={mockCartData} />
          </ApplicationProvider>
        </Provider>,
      );

      const button = screen.getByTestId('item-id-0');

      user.press(button);

      expect(mockReturnFromMenu).toHaveBeenCalledWith(mockCartItem);
    });
  });
});
