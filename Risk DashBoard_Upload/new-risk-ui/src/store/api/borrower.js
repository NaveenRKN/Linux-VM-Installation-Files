import axios from "./axios-configure";
import { API_APP_URL } from "../../config/navigation/constants";

const getBorrower = async (data) => {
  let head = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      Custid: data.custid,
      Userid: data.userId,
    },
  };
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_APP_URL}api/Common/GetBorrowerLoans/C`, head)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getBorrowerSummary = async (data) => {
  let heads = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      Custid: data.custid,
      Userid: data.userId,
      Model: "servicing",
    },
  };
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${API_APP_URL}api/Summary/GetLoanSummaryDetails/${data.custid}/${data.loanId}`,
        heads
      )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getBorrowerActivities = async (data) => {
  let heads = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      Custid: data.custid,
      Userid: data.userId,
      Model: "servicing",
    },
  };
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${API_APP_URL}api/Activities/GetLoanActivities/${data.loanId}`,
        heads
      )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getBorrowerStatements = async (data) => {
  let heads = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      Custid: data.custid,
      Userid: data.userId,
      Model: "servicing",
    },
  };
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${API_APP_URL}api/Statements/GetLoanStatement/${data.loanId}`,
        heads
      )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getRelationshipNames = async (data) => {
  let heads = {
    headers: {
      Authorization: `Bearer ${data.token}`,
      Custid: data.custid,
      Userid: data.userId,
      Model: "servicing",
    },
  };
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_APP_URL}api/Home/GetRelationshipNames/${data.loanId}`, heads)
      .then((datas) => {
        let response = datas.data;
        let dataList = response.find((cartItem) => {
          return cartItem.userId === data.userId;
        });
        return axios.get(
          `${API_APP_URL}api/Checklist/GetChecklists/${data.loanId}/${dataList.id}/${data.custid}`,
          heads
        );
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const postSaveDocument = async (formData, heads) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_APP_URL}api/Checklist/SaveDocument`, formData, heads)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
const getAdditionalLoanDocuments = async (heads) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_APP_URL}api/Message/GetAdditionalLoanDocuments/${heads.headers.loanId}/S`, heads)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
const getUserMessages = async (heads) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_APP_URL}api/Message/GetUserMessages/${heads.headers.loanId}/${heads.headers.Userid}`, heads)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
const saveSVPAdditionalDocuments = async (formData,heads) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_APP_URL}api/Message/SaveSVPAdditionalDocuments`, formData, heads)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
const saveSendSVPMessages = async (formData,heads) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_APP_URL}api/Message/SaveSendSVPMessages`, formData, heads)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export {
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
};
