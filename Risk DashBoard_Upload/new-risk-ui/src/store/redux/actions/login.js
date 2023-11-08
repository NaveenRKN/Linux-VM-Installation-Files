import * as UserConstants from '../contsants';
import {postLogin,logOut} from '../../api/login';

export const postLoginAction = (user) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: UserConstants.POST_LOGIN,
    });
    postLogin(user)
      .then((response) => {
        dispatch({
          type: UserConstants.POST_LOGIN_SUCCESS,
          payload: response.data,
        });
        resolve(response);
      })
      .catch((err) => {
        dispatch({
          type: UserConstants.POST_LOGIN_ERROR,
        });
        reject(err);
      });
  });
};

export const logOutAction = (user) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: UserConstants.LOG_OUT,
    });
    logOut(user)
      .then((response) => {
        dispatch({
          type: UserConstants.LOG_OUT,
          payload: response.data,
        });
        resolve(response);
      })
      .catch((err) => {
        dispatch({
          type: UserConstants.LOG_OUT,
          payload: [],
        });
        reject(err);
      });
  });
};
 
