import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  color: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 12,
  },

  colorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },

  name: {
    color: '#444',
    fontSize: 18,
    marginLeft: 16,
    overflow: 'hidden',
  },
});
