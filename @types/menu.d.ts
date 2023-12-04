export type CartItem = {
  item: MenuItemType;
  quantity: number;
};

export type CartItems = { [itemId: number]: CartItem };

export type DiscountTypeValue = {
  deductionType: string;
  amount: number;
};

export type DiscountType = {
  value: DiscountTypeValue;
  label: string;
};

export type MenuItemType = {
  id: number;
  name: string;
  category: string;
  price: number;
};
