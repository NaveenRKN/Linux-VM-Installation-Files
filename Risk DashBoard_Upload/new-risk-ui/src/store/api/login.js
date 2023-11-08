import axios from './axios-configure';
import {API_APP_URL} from "../../config/navigation/constants" 

const postLogin = async (formData) => {
return new Promise((resolve, reject) => {
   axios
   .post(`${API_APP_URL}api/Account/AuthenticateUser`,formData)
   .then((response) => {
       resolve(response);
   })
   .catch((error) => {
       reject(error);
   });
});
};

const logOut = async (data) => {
    let heads = {
        headers: {
          Authorization: `Bearer ${data.token}`,
          Custid: data.custid,
          Userid: data.userId, 
        },
      }; 
return new Promise((resolve, reject) => {
   axios
   .get(`${API_APP_URL}api/Account/LogoutUser`,heads)
   .then((response) => {
       resolve(response);
   })
   .catch((error) => {
       reject(error);
   });
});
};

export {postLogin,logOut};