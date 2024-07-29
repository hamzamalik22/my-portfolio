import {
    getAboutStart,
    getAboutSuccess,
    getAboutFailure,
  } from "../reducers/AboutSlice";
  
  import api from "../../utils/api";
  
  // Fetch customers
  export const fetchAbout = () => async (dispatch) => {
    try {
      dispatch(getAboutStart());
      const response = await api.get("/api/about/");
      console.log(response);
      dispatch(getAboutSuccess(response.data));
    } catch (error) {
      dispatch(getAboutFailure(error.message));
    }
  };
  