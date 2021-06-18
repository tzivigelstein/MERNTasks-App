import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },

  form: {
    marginTop: '30%',
  },

  inputContainer: {
    marginVertical: 10,
  },

  label: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },

  input: {
    borderRadius: 12,
    color: 'rgba(0,0,0,0.8)',
    fontFamily: 'Helvetica',
    fontSize: 16,
    paddingHorizontal: 10,
    shadowColor: 'rgba(0,0,0,0.6)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 4,
    backgroundColor: '#fff',
  },

  inputActive: {
    borderWidth: 1.4,
    borderColor: '#1da0f2',
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
    color: 'rgba(0,0,0,0.6)',
    textAlign: 'center',
  },

  helperHighlight: {
    fontWeight: 'bold',
  },
});
