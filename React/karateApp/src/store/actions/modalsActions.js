export const SET_MODAL = "SET_MODAL";
export const SET_LASTCALL_MODAL = "SET_LASTCALL_MODAL";
export const FETCH_MODAL = "FETCH_MODAL";
export const DELETE_MODAL = "DELETE_MODAL";
export const RESET_STORE_MODAL = "RESET_STORE_MODAL";

export const findModal = (modals, id) => {
  const modal = modals.filter(modal => {
    return id === modal.id;
  });

  return modal.length > 0 ? modal[0] : null;
};

const filterModal = (modals, id) => {
  return modals.filter(modal => {
    return id !== modal.id;
  });
};

const returnAction = ({
  type = FETCH_MODAL,
  modals = [],
  last_call = null
}) => {
  return {
    type: type,
    content: modals,
    last_call: last_call
  };
};

export const setModal = (id = null) => {
  return (dispatch, getState) => {
    const newobj = {
      id: id,
      status: null,
      modal_title: "",
      modal_body: ""
    };
    const newmodal = {
      type: SET_MODAL,
      last_call: id,
      modals: [...getState().modals.content, newobj]
    };
    dispatch(returnAction(newmodal));
  };
};

export const setLastcallModal = (id = null) => {
  return (dispatch, getState) => {
    const newmodal = {
      type: SET_LASTCALL_MODAL,
      last_call: id
    };
    dispatch(() => {
      return newmodal;
    });
  };
};

export const fetchModal = (data = {}) => {
  const { id = null, status = "", modal_title = "", modal_body = "" } = data;
  return (dispatch, getState) => {
    if (id) {
      let modals = filterModal(getState().modals.content, id);
      modals = [
        ...modals,
        {
          id: id,
          status: status,
          modal_title: modal_title,
          modal_body: modal_body
        }
      ];
      dispatch(returnAction({ modals: modals, last_call: id }));
    }
  };
};

export const deleteModal = (id = "") => {
  return (dispatch, getState) => {
    let modals = filterModal(getState().modals.content, id);
    dispatch(returnAction({ modals: modals }));
  };
};
