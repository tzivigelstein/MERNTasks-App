import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginVertical: 8,
    borderLeftWidth: 5,
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.6)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 4,
    backgroundColor: '#fff',
  },

  taskHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  taskName: {
    flexShrink: 1,
    fontSize: 18,
  },

  stateContainer: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },

  stateText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },

  detailView: {
    overflow: 'hidden',
  },

  taskOption: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 6,
    paddingVertical: 6,
    justifyContent: 'space-around',
  },
});
