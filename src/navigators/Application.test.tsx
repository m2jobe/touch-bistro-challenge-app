import React from 'react';
import {
  render,
  screen,
  userEvent,
  waitFor,
} from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { store } from '../store';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import ApplicationNavigator from './Application';
import { UserEventInstance } from '@testing-library/react-native/build/user-event/setup';

let user: UserEventInstance;

jest.mock('@react-navigation/devtools', () => ({
  ...jest.requireActual('@react-navigation/devtools'),
  useFlipper: () => jest.fn(),
}));

beforeEach(() => {
  user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
});

describe('when the Application starts', () => {
  it('should load the Startup then Home Screen correctly', async () => {
    jest.useFakeTimers();

    render(
      <Provider store={store}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider mapping={eva.mapping} theme={eva.light}>
          <ApplicationNavigator />
        </ApplicationProvider>
      </Provider>,
    );

    expect(screen.getByTestId('activity-indicator')).toBeOnTheScreen();

    jest.runAllTimers();

    await waitFor(() => {
      expect(screen.getByText('Menu')).toBeOnTheScreen();
    });

    user.press(screen.getByTestId('discounts-button'));

    await waitFor(() => {
      expect(screen.getByText('Discounts')).toBeOnTheScreen();
    });
  }, 30000);
});
