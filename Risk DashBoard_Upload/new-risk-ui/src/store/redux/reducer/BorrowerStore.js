import * as UserConstants from "../contsants";
import initialState from "./initialState";

const BorrowerStore = (state = initialState.getBorrower, action) => {
  switch (action.type) {
    case UserConstants.GET_BORROWER:
      return { ...state, loading: true };
    case UserConstants.GET_BORROWER_SUCCESS:
      return {
        ...state,
        borrowerLoans: action.payload,
        loading: false,
      };
    case UserConstants.GET_BORROWER_ERROR:
      return { ...state, loading: false, error: true };
    case UserConstants.GET_SUMMARY:
      return { ...state, loading: true };
    case UserConstants.GET_SUMMARY_SUCCESS:
      return {
        ...state,
        borrowerSummary: action.payload,
        loading: false,
      };
    case UserConstants.GET_SUMMARY_ERROR:
      return { ...state, loading: false, error: true };
    case UserConstants.GET_ACTIVITIES:
      return { ...state, loading: true };
    case UserConstants.GET_ACTIVITIES_SUCCESS:
      return {
        ...state,
        borrowerActivities: action.payload,
        loading: false,
      };
    case UserConstants.GET_ACTIVITIES_ERROR:
      return { ...state, loading: false, error: true };
    case UserConstants.GET_STATEMENTS:
      return { ...state, loading: true };
    case UserConstants.GET_STATEMENTS_SUCCESS:
      return {
        ...state,
        borrowerStatements: action.payload,
        loading: false,
      };
    case UserConstants.GET_STATEMENTS_ERROR:
      return { ...state, loading: false, error: true };
    case UserConstants.GET_RELATIONSHIP:
      return { ...state, loading: true };
    case UserConstants.GET_RELATIONSHIP_SUCCESS:
      return {
        ...state,
        borrowerRelationship: action.payload,
        loading: false,
      };
    case UserConstants.GET_RELATIONSHIP_ERROR:
      return { ...state, loading: false, error: true };
    case UserConstants.GET_CHECKLIST:
      return { ...state, loading: true };
    case UserConstants.GET_CHECKLIST_SUCCESS:
      return {
        ...state,
        borrowerChecklist: action.payload,
        loading: false,
      };
    case UserConstants.GET_CHECKLIST_ERROR:
      return { ...state, loading: false, error: true };
    case UserConstants.POST_DOCUMENT:
      return { ...state, loading: true };
    case UserConstants.POST_DOCUMENT_SUCCESS:
      return {
        ...state,
        borrowerDocument: action.payload,
        loading: false,
      };
    case UserConstants.POST_DOCUMENT_ERROR:
      return { ...state, loading: false, error: true };
    case UserConstants.GET_ADDITIONAL_DOCUMENT:
      return { ...state, loading: true };
    case UserConstants.GET_ADDITIONAL_DOCUMENT_SUCCESS:
      return {
        ...state,
        borrowerAdditionalDocument: action.payload,
        loading: false,
      };
    case UserConstants.GET_ADDITIONAL_DOCUMENT_ERROR:
      return { ...state, loading: false, error: true };
    case UserConstants.GET_USERMESSAGE:
      return { ...state, loading: true };
    case UserConstants.GET_USERMESSAGE_SUCCESS:
      return {
        ...state,
        borrowerUserMessage: action.payload,
        loading: false,
      };
    case UserConstants.GET_USERMESSAGE_ERROR:
      return { ...state, loading: false, error: true };
    case UserConstants.SAVE_ADDITIONAL_DOCUMENT:
      return { ...state, loading: true };
    case UserConstants.SAVE_ADDITIONAL_DOCUMENT_SUCCESS:
      return {
        ...state,
        borrowerUserMessage: action.payload,
        loading: false,
      };
    case UserConstants.SAVE_ADDITIONAL_DOCUMENT_ERROR:
      return { ...state, loading: false, error: true };
    case UserConstants.SAVE_SEND_MESSAGE:
      return { ...state, loading: true };
    case UserConstants.SAVE_SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        borrowerSendMessage: action.payload,
        loading: false,
      };
    case UserConstants.SAVE_SEND_MESSAGE_ERROR:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};
export default BorrowerStore;
