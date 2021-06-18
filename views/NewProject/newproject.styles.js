import { StyleSheet } from 'react-native';

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

  colorTitleHelper: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 6,
  },

  colorHelper: {
    color: 'rgba(0,0,0,0.6)',
    fontSize: 15,
    marginBottom: 8,
  },

  colorList: {
    width: '100%',
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
