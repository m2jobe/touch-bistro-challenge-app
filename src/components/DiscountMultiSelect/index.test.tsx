import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import DiscountMultiSelect from '.';
import { discounts } from '@/services/modules/menu';
import { updateDiscounts } from '@/features/bill/billSlice';

// Multi select items do not render without this mock
// Referencing mocking fix on https://github.com/testing-library/native-testing-library/issues/125
import { View } from 'react-native';
jest.spyOn(View.prototype, 'measureInWindow').mockImplementation(cb => {
  cb(18, 113, 357, 50);
});

let mockDispatch: () => void;

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

beforeEach(() => {
  mockDispatch = jest.fn();
});

describe('when DiscountMultiSelect is called', () => {
  it('should render correctly', () => {
    const component = (
      <Provider store={store}>
        <ApplicationProvider mapping={eva.mapping} theme={eva.light}>
          <DiscountMultiSelect />
        </ApplicationProvider>
      </Provider>
    );

    render(component);

    expect(screen.queryByTestId('multi-select')).toBeOnTheScreen();
  });

  describe('when a discount is selected', () => {
    it('should render correctly', async () => {
      const component = (
        <Provider store={store}>
          <ApplicationProvider mapping={eva.mapping} theme={eva.light}>
            <DiscountMultiSelect />
          </ApplicationProvider>
        </Provider>
      );

      render(component);

      fireEvent.press(screen.getByTestId('multi-select'));

      const selecedDiscount = screen.getByText(discounts[0].label);
      await waitFor(() => expect(selecedDiscount).toBeDefined());
      fireEvent.press(selecedDiscount);

      expect(mockDispatch).toHaveBeenCalledWith(
        updateDiscounts([discounts[0].value]),
      );
    });
  });
});
