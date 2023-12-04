import React from 'react';
import { render, screen } from '@testing-library/react-native';
import Checkout from '.';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

test('render correctly', () => {
  const component = (
    <Provider store={store}>
      <ApplicationProvider mapping={eva.mapping} theme={eva.light}>
        <Checkout />
      </ApplicationProvider>
    </Provider>
  );

  render(component);

  expect(screen.queryByTestId('sub-total')).toBeOnTheScreen();
  expect(screen.queryByTestId('discounts')).toBeOnTheScreen();
  expect(screen.queryByTestId('tax')).toBeOnTheScreen();
  expect(screen.queryByTestId('total')).toBeOnTheScreen();
});
