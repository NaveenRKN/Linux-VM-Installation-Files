import axios from './axios-configure';
import { API_RISK } from "../../config/navigation/constants"

const getRisk = async ({ startYear, endYear, riskType }) => {
    return new Promise((resolve, reject) => {
        let riskTypes = riskType ? '/' + riskType : ''
        let endPoint = startYear + '/' + '01/' + endYear + '/10' + riskTypes
        axios
            .get(`${API_RISK}api/RiskDashboard/GetRisks/` + endPoint)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export { getRisk };