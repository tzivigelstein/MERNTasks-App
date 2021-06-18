import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 32,
    width: '90%',
    marginHorizontal: '5%',
    zIndex: 3,
  },

  success: {
    backgroundColor: '#08a045',
  },

  error: {
    backgroundColor: '#d64550',
  },

  info: {
    backgroundColor: '#ffc107',
  },

  text: {
    color: '#fff',
  },
});
