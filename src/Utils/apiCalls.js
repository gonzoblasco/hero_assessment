import {ACTIONS} from './actions';

const API_CALLS = {
  POST_FORM: async (url, payload) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      const {status, message} = await response.json();

      if (status === 'sucess') {
        return ({type: ACTIONS.POST_SUCCESS, payload: message});
      } else {
        return ({type: ACTIONS.POST_ERROR, payload: message});
      }
    } catch (e) {
      return ({type: ACTIONS.POST_ERROR, payload: 'Mayday, mayday!!!'});
    }
  },
};

export default API_CALLS;
