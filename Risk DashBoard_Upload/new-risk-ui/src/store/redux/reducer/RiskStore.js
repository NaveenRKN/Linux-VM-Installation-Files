import * as UserConstants from '../contsants';

const instialState = {
  riskData: null,
  loading: false,
  error: false,
};

const RiskStore = (state = instialState, action) => {
  switch (action.type) {
    case UserConstants.GET_RISK:
      return { ...state, loading: true };
    case UserConstants.GET_RISK_SUCCESS:
      return { ...state, riskData: action.payload, loading: false };
    case UserConstants.GET_RISK_ERROR:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};
export default RiskStore