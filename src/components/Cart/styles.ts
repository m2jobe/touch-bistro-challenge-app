import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  cartItemContainer: {
    backgroundColor: '#f9f9f9',
    borderColor: 'grey',
    borderWidth: 0.3,
    borderRadius: 5,
    marginTop: 6,
    padding: 3,
  },
  cartItemDeleteButton: { marginRight: -9 },
  cartItemTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cartContainer: {
    marginTop: 16,
  },
});

export default styles;
