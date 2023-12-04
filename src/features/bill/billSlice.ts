import { createSelector, createSlice } from '@reduxjs/toolkit';
import { CartItems, DiscountTypeValue } from 'types/menu';
import type { PayloadAction } from '@reduxjs/toolkit';
import { categories, taxes } from '@/services/modules/menu';

const NON_EXCLUSIV_CATEGORIES = [categories.alcohol];

export interface BillState {
  cart: CartItems;
  discounts: DiscountTypeValue[];
}

const initialState: BillState = {
  cart: {},
  discounts: [],
};

export const billSlice = createSlice({
  name: 'bill',
  initialState,
  reducers: {
    updateCart(state, action: PayloadAction<CartItems>) {
      state.cart = action.payload;
    },
    updateDiscounts(state, action: PayloadAction<DiscountTypeValue[]>) {
      state.discounts = action.payload;
    },
  },
});

export const { updateCart, updateDiscounts } = billSlice.actions;

export default billSlice.reducer;

// Bill related selectors
export const selectCartData = (state: { bill: BillState }) => state.bill.cart;

export const selectDiscounts = (state: { bill: BillState }) =>
  state.bill.discounts;

export const selectSubtotal = (state: { bill: BillState }) => {
  const cart = Object.values(state.bill.cart);
  if (!cart?.length) {
    return 0;
  }

  return cart.reduce(
    (a, currentCartItem) =>
      a + currentCartItem?.item.price * currentCartItem.quantity,
    0,
  );
};

export const selectTax = (state: { bill: BillState }) => {
  const cart = Object.values(state.bill.cart);
  if (!cart?.length) {
    return 0;
  }
  const taxAmountThatApplyToNonExclusiveCategories = taxes
    .filter(tax => !tax.appliesToOnly)
    .reduce((a, currentTaxItem) => a + currentTaxItem.amountInPercentage, 0);
  const subTotalOfNonExclusiveCategories = cart
    .filter(c => !NON_EXCLUSIV_CATEGORIES.includes(c.item.category))
    .reduce(
      (a, currentCartItem) =>
        a + currentCartItem.item.price * currentCartItem.quantity,
      0,
    );
  const taxForNonExclusiveCategories =
    subTotalOfNonExclusiveCategories *
    (taxAmountThatApplyToNonExclusiveCategories / 100);

  const taxesForExclusiveCategories = [];
  for (let exclusiveCategory of NON_EXCLUSIV_CATEGORIES) {
    const subTotalOfExlusiveCategory = cart
      .filter(c => c.item.category === exclusiveCategory)
      .reduce(
        (a, currentCartItem) =>
          a + currentCartItem.item.price * currentCartItem.quantity,
        0,
      );
    const taxAmountThatApplyToExclusiveCategories = taxes
      .filter(tax => tax.appliesToOnly?.includes(exclusiveCategory))
      .reduce((a, currentTaxItem) => a + currentTaxItem.amountInPercentage, 0);

    const taxForExclusiveCategories =
      subTotalOfExlusiveCategory *
      (taxAmountThatApplyToExclusiveCategories / 100);

    taxesForExclusiveCategories.push(taxForExclusiveCategories);
  }

  const totalTaxesForExlusiveCategories = taxesForExclusiveCategories.reduce(
    (a, taxAmount) => a + taxAmount,
    0,
  );

  return taxForNonExclusiveCategories + totalTaxesForExlusiveCategories;
};

export const selectDiscount = createSelector(
  [selectSubtotal, selectTax, state => state.bill.discounts],
  (subTotal, tax, discounts: DiscountTypeValue[]) => {
    const totalAfterTax = subTotal - tax;
    if (!discounts?.length) {
      return 0;
    }

    const percDiscountsInDollarAmount = discounts
      .filter(discount => discount.deductionType === 'percentage')
      .reduce((a, discount) => a + totalAfterTax * (discount.amount / 100), 0);

    const dollarDiscount = discounts
      .filter(discount => discount.deductionType === 'dollar')
      .reduce((a, discount) => a + discount.amount, 0);

    return percDiscountsInDollarAmount + dollarDiscount;
  },
);

export const selectFinalTotal = createSelector(
  [selectSubtotal, selectTax, selectDiscount],
  (subTotal, tax, discount) => {
    const finalTotal = subTotal + tax - discount;

    return finalTotal >= 0 ? finalTotal : 0;
  },
);
