/* eslint-disable */
import axios from 'axios';
axios.defaults.withCredentials = true;
const ROOT_URL = process.env.NODE_ENV === 'production' ? 'https://bangarangbingo.herokuapp.com' : 'http://localhost:8080';

export const USER_REGISTERED = 'USER_REGISTERED';
export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
export const USER_UNAUTHENTICATED = 'USER_UNAUTHENTICATED';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const GET_CARDS = 'GET_CARDS';
export const GET_CARD = 'GET_CARD';
export const ADD_CARD = 'ADD_CARD';
export const EDIT_CARD = 'EDIT_CARD';
// export const CHECK_IF_AUTHENTICATED = 'CHECK_IF_AUTHENTICATED';

export const authError = error => {
  return {
    type: AUTHENTICATION_ERROR,
    payload: error
  };
};

// updateUser needs work
export const updateUserPassword = (username, password, confirmPassword, newPassword, confirmNewPassword, history) => {
  return dispatch => {
    if (password !== confirmPassword) {
      dispatch(authError('Old passwords do not match'));
      return;
    }
    if (newPassword !== confirmNewPassword) {
      dispatch(authError('New passwords do not match'));
      return;
    }
    axios
      .post(`${ROOT_URL}/auth/reset`, { username, password, confirmPassword, newPassword, confirmNewPassword })
      .then(() => {
        dispatch({
          type: USER_REGISTERED
        });
        history.push('/cards');
      })
      .catch(() => {
        dispatch(authError('Failed to update user password'));
      });
  };
};

export const updateUserEmail = (username, newUsername, password, confirmPassword, history) => {
  return dispatch => {
    if (password !== confirmPassword) {
      dispatch(authError('Passwords do not match'));
      return;
    }
    axios
      .post(`${ROOT_URL}/auth/update`, { username, newUsername, password, confirmPassword })
      .then(() => {
        dispatch({
          type: USER_REGISTERED
        });
        history.push('/cards');
      })
      .catch(() => {
        dispatch(authError('Failed to update user email'));
      });
  };
};

export const downloadCards = () => {
  return dispatch => {
    window.location.href = `${ROOT_URL}/cards/download`;
  }
}

export const getCards = () => {
  return dispatch => {
    axios
      .get(`${ROOT_URL}/cards`)
      .then((res) => {
        dispatch({
          type: GET_CARDS,
          payload: res
        });
      })
      .catch(() => {
        dispatch(authError('Failed to get cards'));
      });
  };
};

export const getCard = (id) => {
  return dispatch => {
    axios
      .get(`${ROOT_URL}/cards/${id}`)
      .then((res) => {
        dispatch({
          type: GET_CARD,
          payload: res
        });
      })
      .catch(() => {
        dispatch(authError('Failed to get card by that id'));
      });
  };
};

export const addCard = (card) => {
  return dispatch => {
    axios
      .post(`${ROOT_URL}/card/create`, card)
      .then((res) => {
        dispatch({
          type: ADD_CARD,
          payload: res
        });
      })
      .catch(() => {
        dispatch(authError('Failed to add new card'));
      });
  };
};

export const editCard = (id, card) => {
  return dispatch => {
    axios
      .post(`${ROOT_URL}/card/edit/{$id}`, card)
      .then((res) => {
        dispatch({
          type: EDIT_CARD,
          payload: res
        });
      })
      .catch(() => {
        dispatch(authError('Failed to edit card'));
      });
  };
};

export const processPayment = (token, options) => {
  const authToken = window.localStorage.getItem('token');
  return dispatch => {
    axios.post(`${ROOT_URL}/payments`, { options, token }, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      }
    }).then(res => {
      console.log(res);
    });
    console.log('send to server', token, options);
  }
}