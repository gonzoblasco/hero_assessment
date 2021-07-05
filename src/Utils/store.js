import React, {createContext, useContext, useReducer} from 'react';
import {ACTIONS} from './actions';

const initialState = {
  error: false,
  loading: false,
  message: '',
};

const store = createContext(initialState);

const {Provider} = store;

const StateProvider = ({children}) => {
  const [state, dispatch] = useReducer(
      (state = initialState, {type, payload}) => {
        switch (type) {
          case ACTIONS.POSTING:
            return {
              ...initialState,
              loading: true,
            };
          case ACTIONS.POST_ERROR:
            return {
              ...initialState,
              error: payload,
            };
          case ACTIONS.POST_SUCCESS:
            return {
              ...initialState,
              message: payload,
            };
          case ACTIONS.CLEAN:
            return {
              ...initialState,
            };
          default:
            throw new Error();
        }
      }, initialState);

  return <Provider value={ {state, dispatch} }>{ children }</Provider>;
};

export {store, StateProvider};

export const useStore = () => useContext(store);



