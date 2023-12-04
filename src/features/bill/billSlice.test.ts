import { CartItem, MenuItemType } from 'types/menu';
import { categories } from '@/services/modules/menu';
import billSlice, {
  BillState,
  selectCartData,
  selectDiscount,
  selectSubtotal,
  selectTax,
} from './billSlice';

let mockState: { bill: BillState };
let mockMenuItem: MenuItemType = {
  id: 2,
  name: 'Calamari',
  category: categories.appetizers,
  price: 10,
};
let mockMenuItem2: MenuItemType = {
  id: 3,
  name: 'Spring Rolls',
  category: categories.appetizers,
  price: 5,
};
let mockCartItem: CartItem = { item: mockMenuItem, quantity: 2 };
let mockCartItem2: CartItem = { item: mockMenuItem2, quantity: 1 };

beforeEach(() => {
  mockState = {
    bill: {
      cart: {
        [mockMenuItem.id]: mockCartItem,
        [mockMenuItem2.id]: mockCartItem2,
      },
      discounts: [
        { deductionType: 'dollar', amount: 5 },
        { deductionType: 'percentage', amount: 10 },
        { deductionType: 'percentage', amount: 20 },
      ],
    },
  };
});

describe('features > bill > billSlice', () => {
  test('updates cart, if updateCart action is provided', () => {
    mockState.bill = { discounts: mockState.bill.discounts, cart: {} };

    const expectedState = {
      cart: {
        [mockMenuItem.id]: mockCartItem,
      },
      discounts: mockState.bill.discounts,
    };

    const action = {
      type: 'bill/updateCart',
      payload: {
        [mockMenuItem.id]: mockCartItem,
      },
    };

    expect(billSlice(mockState.bill, action)).toEqual(expectedState);
  });
});

describe('when selectCartData is called', () => {
  test('it should return the cart data', () => {
    const expectedCartData = {
      [mockMenuItem.id]: mockCartItem,
      [mockMenuItem2.id]: mockCartItem2,
    };

    const cartData = selectCartData(mockState);

    expect(cartData).toEqual(expectedCartData);
  });
});

describe('when selectSubtotal is called', () => {
  test('it should return the subtotal', () => {
    const expectedSubTotal = 25;
    const subTotal = selectSubtotal(mockState);

    expect(subTotal).toEqual(expectedSubTotal);
  });

  describe('if the cart is empty', () => {
    beforeEach(() => {
      mockState.bill.cart = {};
    });
    test('it should return 0 as dollar amount', () => {
      const subTotal = selectSubtotal(mockState);

      expect(subTotal).toEqual(0);
    });
  });
});

describe('when selectTax is called', () => {
  let mockAlcoholMenuItem = {
    id: 4,
    name: 'Wine',
    category: categories.alcohol,
    price: 10,
  };

  beforeEach(() => {
    mockState = {
      bill: {
        discounts: mockState.bill.discounts,
        cart: {
          [mockMenuItem.id]: mockCartItem,
          [mockMenuItem2.id]: mockCartItem2,
          [mockAlcoholMenuItem.id]: { item: mockAlcoholMenuItem, quantity: 1 },
        },
      },
    };
  });

  test('it should return the tax', () => {
    const expectedTax = 4.25;
    const tax = selectTax(mockState);

    expect(tax).toEqual(expectedTax);
  });
});

describe('when selectDiscount is called', () => {
  test('it should return the discount', () => {
    const expectedTotalDiscount = 11.525;
    const totalDiscount = selectDiscount(mockState);

    expect(totalDiscount).toEqual(expectedTotalDiscount);
  });
});
