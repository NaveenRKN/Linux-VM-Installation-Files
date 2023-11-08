import { combineReducers } from 'redux'; 
import LoginStore from './LoginStore'; 
import RiskStore from './RiskStore'; 

const index = combineReducers({ 
    LoginStore,
    RiskStore
})
export default index;