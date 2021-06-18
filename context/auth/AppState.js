import React, { useReducer } from 'react';
import AppContext from './AppContext';
import AppReducer from './AppReducer';

const AppState = ({ children }) => {
  const initialState = {
    userData: {},
  };
  const [state, dispatch] = useReducer(AppReducer, initialState);



  return (
    <AppContext.Provider
      value={{
        userData: state.userData,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
