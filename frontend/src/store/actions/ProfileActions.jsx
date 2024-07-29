import {
  getProfileStart,
  getProfileSuccess,
  getProfileFailure,
} from "../reducers/ProfileSlice";

import api from "../../utils/api";

// Fetch customers
export const fetchProfile = () => async (dispatch) => {
  try {
    dispatch(getProfileStart());
    const response = await api.get("/api/profile/");
    console.log(response);
    dispatch(getProfileSuccess(response.data));
  } catch (error) {
    dispatch(getProfileFailure(error.message));
  }
};
