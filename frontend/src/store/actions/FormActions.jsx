import {
  createContactFormStart,
  createContactFormSuccess,
  createContactFormFailure,
} from "../reducers/FormSlice";

import api from "../../utils/api";

export const createMessage = (data) => async (dispatch) => {
  try {
    dispatch(createContactFormStart());
    const response = await api.post("/api/message/", data);
    console.log(response);
    dispatch(createContactFormSuccess(response.data));
  } catch (error) {
    dispatch(createContactFormFailure(error.message));
  }
};
