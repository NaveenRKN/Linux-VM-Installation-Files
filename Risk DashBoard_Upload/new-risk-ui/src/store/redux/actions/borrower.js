import * as UserConstants from "../contsants";
import {
  getBorrower,
  getBorrowerSummary,
  getBorrowerActivities,
  getBorrowerStatements,
  getRelationshipNames,  
  postSaveDocument,
  getAdditionalLoanDocuments,
  getUserMessages,
  saveSVPAdditionalDocuments,
  saveSendSVPMessages
} from "../../api/borrower";

export const getBorrowerLoans = (user) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: UserConstants.GET_BORROWER,
    });
    getBorrower(user)
      .then((response) => {
        dispatch({
          type: UserConstants.GET_BORROWER_SUCCESS,
          payload: response.data,
        });
        resolve(response);
      })
      .catch((err) => {
        dispatch({
          type: UserConstants.GET_BORROWER_ERROR,
        });
        reject(err);
      });
  });
};

export const getLoanSummaryDetails = (user) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: UserConstants.GET_SUMMARY,
    });
    getBorrowerSummary(user)
      .then((response) => {
        dispatch({
          type: UserConstants.GET_SUMMARY_SUCCESS,
          payload: response.data,
        });
        resolve(response);
      })
      .catch((err) => {
        dispatch({
          type: UserConstants.GET_SUMMARY_ERROR,
        });
        reject(err);
      });
  });
};

export const getLoanActivities = (user) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: UserConstants.GET_ACTIVITIES,
    });
    getBorrowerActivities(user)
      .then((response) => {
        dispatch({
          type: UserConstants.GET_ACTIVITIES_SUCCESS,
          payload: response.data,
        });
        resolve(response);
      })
      .catch((err) => {
        dispatch({
          type: UserConstants.GET_ACTIVITIES_ERROR,
        });
        reject(err);
      });
  });
};

export const getLoanStatements = (user) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: UserConstants.GET_STATEMENTS,
    });
    getBorrowerStatements(user)
      .then((response) => {
        dispatch({
          type: UserConstants.GET_STATEMENTS_SUCCESS,
          payload: response.data,
        });
        resolve(response);
      })
      .catch((err) => {
        dispatch({
          type: UserConstants.GET_STATEMENTS_ERROR,
        });
        reject(err);
      });
  });
};
export const getRelationshipNamesAction = (user) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: UserConstants.GET_RELATIONSHIP,
    });
    getRelationshipNames(user)
      .then((response) => {
        dispatch({
          type: UserConstants.GET_RELATIONSHIP_SUCCESS,
          payload: response.data,
        });
        resolve(response);
      })
      .catch((err) => {
        dispatch({
          type: UserConstants.GET_RELATIONSHIP_ERROR,
        });
        reject(err);
      });
  });
};
export const getChecklistAction = (user) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: UserConstants.GET_CHECKLIST,
    });
    getChecklist(user)
      .then((response) => {
        dispatch({
          type: UserConstants.GET_CHECKLIST_SUCCESS,
          payload: response.data,
        });
        resolve(response);
      })
      .catch((err) => {
        dispatch({
          type: UserConstants.GET_CHECKLIST_ERROR,
        });
        reject(err);
      });
  });
};
export const postSaveDocumentAction = (formData,heads) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: UserConstants.POST_DOCUMENT,
    });
    postSaveDocument(formData,heads)
      .then((response) => {
        dispatch({
          type: UserConstants.POST_DOCUMENT_SUCCESS,
          payload: response.data,
        });
        resolve(response);
      })
      .catch((err) => {
        dispatch({
          type: UserConstants.POST_DOCUMENT_ERROR,
        });
        reject(err);
      });
  });
};
export const getAdditionalLoanDocumentsAction = (heads) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: UserConstants.GET_ADDITIONAL_DOCUMENT,
    });
    getAdditionalLoanDocuments(heads)
      .then((response) => {
        dispatch({
          type: UserConstants.GET_ADDITIONAL_DOCUMENT_SUCCESS,
          payload: response.data,
        });
        resolve(response);
      })
      .catch((err) => {
        dispatch({
          type: UserConstants.GET_ADDITIONAL_DOCUMENT_ERROR,
        });
        reject(err);
      });
  });
};
export const getUserMessagesAction = (heads) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: UserConstants.GET_USERMESSAGE,
    });
    getUserMessages(heads)
      .then((response) => {
        dispatch({
          type: UserConstants.GET_USERMESSAGE_SUCCESS,
          payload: response.data,
        });
        resolve(response);
      })
      .catch((err) => {
        dispatch({
          type: UserConstants.GET_USERMESSAGE_ERROR,
        });
        reject(err);
      });
  });
};
export const saveSVPAdditionalDocumentsAction = (formData,heads) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: UserConstants.SAVE_ADDITIONAL_DOCUMENT,
    });
    saveSVPAdditionalDocuments(formData,heads)
      .then((response) => {
        dispatch({
          type: UserConstants.SAVE_ADDITIONAL_DOCUMENT_SUCCESS,
          payload: response.data,
        });
        resolve(response);
      })
      .catch((err) => {
        dispatch({
          type: UserConstants.SAVE_ADDITIONAL_DOCUMENT_ERROR,
        });
        reject(err);
      });
  });
};
export const saveSendSVPMessagesAction = (formData,heads) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: UserConstants.SAVE_SEND_MESSAGE,
    });
    saveSendSVPMessages(formData,heads)
      .then((response) => {
        dispatch({
          type: UserConstants.SAVE_SEND_MESSAGE_SUCCESS,
          payload: response.data,
        });
        resolve(response);
      })
      .catch((err) => {
        dispatch({
          type: UserConstants.SAVE_SEND_MESSAGE_ERROR,
        });
        reject(err);
      });
  });
};
