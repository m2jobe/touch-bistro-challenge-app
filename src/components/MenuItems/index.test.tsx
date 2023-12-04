import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { items } from '@/services/modules/menu';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { MenuItemType } from 'types/menu';
import MenuItems from '.';
import { UserEventInstance } from '@testing-library/react-native/build/user-event/setup';

let mockAddToMenu: (item: MenuItemType) => () => void;
let mockMenuItem: MenuItemType;
let user: UserEventInstance;

beforeEach(() => {
  mockAddToMenu = jest.fn();
  mockMenuItem = items[0];
  user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
});

describe('when MenuItems is called', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <MenuItems addToMenu={mockAddToMenu} />
        </ApplicationProvider>
      </Provider>,
    );

    expect(screen.queryByTestId('item-id-1')).toBeOnTheScreen();
  });

  describe('when a menu item is pressed', () => {
    jest.useFakeTimers();

    it('should add it to the cart', () => {
      render(
        <Provider store={store}>
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider {...eva} theme={eva.light}>
            <MenuItems addToMenu={mockAddToMenu} />
          </ApplicationProvider>
        </Provider>,
      );

      const button = screen.getByTestId('item-id-1');

      user.press(button);

      expect(mockAddToMenu).toHaveBeenCalledWith(mockMenuItem);
    });
  });
});
