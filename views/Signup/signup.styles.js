import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },

  heading: {
    fontSize: 18,
    textAlign: 'center',
    paddingVertical: 32,
    color: '#494949',
  },

  headingBold: {
    fontWeight: 'bold',
  },

  form: {
    paddingHorizontal: 16,
  },

  inputContainer: {
    marginVertical: 10,
  },

  label: {
    fontSize: 14,
    color: '#696969',
    marginBottom: 8,
  },

  input: {
    color: '#222',
    fontFamily: '',
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#dddfe2',
    borderRadius: 8,
    paddingHorizontal: 10,
  },

  inputActive: {
    borderWidth: 1,
    borderColor: '#2f3848',
    borderBottomColor: '#2f3848',
  },

  button: {
    borderRadius: 12,
    backgroundColor: '#2f3848',
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  helper: {
    color: '#696969',
    textAlign: 'center',
  },

  helperHighlight: {
    fontWeight: 'bold',
  },
});
