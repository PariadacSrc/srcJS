export const SET_FORM_ALERT = "SET_FORM_ALERT";
export const SET_LASTCALL_FORM_ALERT = "SET_LASTCALL_FORM_ALERT";
export const FETCH_FORM_ALERT = "FETCH_FORM_ALERT";
export const DELETE_FORM_ALERT = "DELETE_FORM_ALERT";
export const RESET_STORE_FORM_ALERT = "RESET_STORE_FORM_ALERT";

export const findFormAlert = (form_alerts, id) => {
  const formalert = form_alerts.filter(formalert => {
    return id === formalert.id;
  });

  return formalert.length > 0 ? formalert[0] : null;
};

const filterFormAlert = (form_alerts, id) => {
  return form_alerts.filter(formalert => {
    return id !== formalert.id;
  });
};

const returnAction = ({
  type = FETCH_FORM_ALERT,
  form_alerts = [],
  last_call = null
}) => {
  return {
    type: type,
    content: form_alerts,
    last_call: last_call
  };
};

export const setFormAlert = (id = null) => {
  return (dispatch, getState) => {
    const newobj = {
      id: id,
      status: null,
      form_alert_title: "",
      form_alert_body: ""
    };
    const newformalert = {
      type: SET_FORM_ALERT,
      last_call: id,
      form_alerts: [...getState().form_alerts.content, newobj]
    };
    dispatch(returnAction(newformalert));
  };
};

export const setLastcallFormAlert = (id = null) => {
  return (dispatch, getState) => {
    const newformalert = {
      type: SET_LASTCALL_FORM_ALERT,
      last_call: id
    };
    dispatch(() => {
      return newformalert;
    });
  };
};

export const fetchFormAlert = (data = {}) => {
  const {
    id = null,
    status = "",
    form_alert_title = "",
    form_alert_body = ""
  } = data;
  return (dispatch, getState) => {
    if (id) {
      let form_alerts = filterFormAlert(getState().form_alerts.content, id);
      form_alerts = [
        ...form_alerts,
        {
          id: id,
          status: status,
          form_alert_title: form_alert_title,
          form_alert_body: form_alert_body
        }
      ];
      dispatch(returnAction({ form_alerts: form_alerts, last_call: id }));
    }
  };
};

export const deleteFormAlert = (id = "") => {
  return (dispatch, getState) => {
    let form_alerts = filterFormAlert(getState().form_alerts.content, id);
    dispatch(returnAction({ form_alerts: form_alerts }));
  };
};
