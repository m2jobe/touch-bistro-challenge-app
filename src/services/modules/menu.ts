import { DiscountType, MenuItemType } from 'types/menu';

//Maintain for order for how categories hsould render
export const categories = {
  appetizers: 'Appetizers',
  mains: 'Mains',
  drinks: 'Drinks',
  alcohol: 'Alcohol',
};

export const items: MenuItemType[] = [
  { id: 1, name: 'Nachos', category: categories.appetizers, price: 13.99 },
  { id: 2, name: 'Calamari', category: categories.appetizers, price: 11.99 },
  {
    id: 3,
    name: 'Caesar Salad',
    category: categories.appetizers,
    price: 10.99,
  },
  { id: 4, name: 'Burger', category: categories.mains, price: 9.99 },
  { id: 5, name: 'Hotdog', category: categories.mains, price: 3.99 },
  { id: 6, name: 'Pizza', category: categories.mains, price: 12.99 },
  { id: 7, name: 'Water', category: categories.drinks, price: 0 },
  { id: 8, name: 'Pop', category: categories.drinks, price: 2.0 },
  { id: 9, name: 'Orange Juice', category: categories.drinks, price: 3.0 },
  { id: 10, name: 'Beer', category: categories.alcohol, price: 5.0 },
  { id: 11, name: 'Cider', category: categories.alcohol, price: 6.0 },
  { id: 12, name: 'Wine', category: categories.alcohol, price: 7.0 },
];

export const categoriesWithItems: { name: string; items: MenuItemType[] }[] =
  Object.values(categories).map(category => {
    return {
      name: category,
      items: items.filter(item => item.category === category),
    };
  });

export const taxes = [
  { name: 'Tax 1', amountInPercentage: 5, appliesToOnly: null },
  { name: 'Tax 2', amountInPercentage: 8, appliesToOnly: null },
  {
    name: 'Alcohol Tax',
    amountInPercentage: 10,
    appliesToOnly: [categories.alcohol],
  },
];

export const discounts: DiscountType[] = [
  {
    value: { deductionType: 'dollar', amount: 5 },
    label: '$5 off',
  },
  { value: { deductionType: 'percentage', amount: 10 }, label: '10% off' },
  { value: { deductionType: 'percentage', amount: 20 }, label: '20% off' },
];
