import { StyleSheet } from 'react-native';
import theme from '../../Theme';

export default StyleSheet.create({
  modal: {
    margin: 0,
    width: '100%',
    justifyContent: 'flex-end',
  },

  container: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 32,
  },

  title: {
    fontSize: 28,
    color: 'rgba(0,0,0,0.8)',
    fontWeight: 'bold',
    marginBottom: 16,
  },

  label: {
    color: 'rgba(0,0,0,0.6)',
    fontSize: 15,
    marginBottom: 8,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.6)',
  },

  textInput: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.8)',
    margin: 0,
    paddingHorizontal: 10,
    flex: 1,
  },

  textInputActive: {
    borderWidth: 2,
    borderColor: '#1da0f2',
  },

  textInputError: {
    borderWidth: 2,
    borderColor: '#d64550',
  },

  statesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },

  stateContainer: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'red',
  },

  activeTrueState: {
    borderWidth: 2,
    borderColor: theme.success,
    borderRadius: 16,
    padding: 4,
  },

  activeFalseState: {
    borderWidth: 2,
    borderColor: theme.info,
    borderRadius: 16,
    padding: 4,
  },

  button: {
    borderRadius: 12,
    width: '100%',
    marginVertical: 16,
    backgroundColor: '#2f3848',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
