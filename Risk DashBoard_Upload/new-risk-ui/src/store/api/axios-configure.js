import axios from 'axios'; 
import {API_APP_URL} from "../../config/navigation/constants" 
const app = axios.create({
    baseURL: API_APP_URL,
    
})

export default app; 