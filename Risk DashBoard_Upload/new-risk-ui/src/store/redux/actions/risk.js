import * as UserConstants from '../contsants';
import { getRisk } from '../../api/risk';

export const getRiskAction = (user) => (dispatch) => {
    return new Promise((resolve, reject) => {

        getRisk(user)
            .then((response) => {
                dispatch({
                    type: UserConstants.GET_RISK_SUCCESS,
                    payload: response.data,
                });
                resolve(response);
            })
            .catch((err) => {

                reject(err);
            });
    });
};