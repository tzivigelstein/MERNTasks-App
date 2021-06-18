import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },

  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingVertical: 24,
    color: 'rgba(0,0,0,0.8)',
  },

  optionsContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },

  option: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  optionTitle: {
    color: 'rgba(0,0,0,0.6)',
    fontSize: 14,
    margin: 0,
  },

  optionValue: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 16,
    marginTop: 6,
  },

  color: {
    borderRadius: 40 / 4,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },

  deleteButton: {
    borderRadius: 12,
    paddingVertical: 12,
    backgroundColor: '#f44336',
    marginBottom: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  deleteProjectName: {
    textTransform: 'uppercase',
  },
});
