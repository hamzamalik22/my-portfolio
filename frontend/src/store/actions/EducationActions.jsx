import {
    getEducationStart,
    getEducationSuccess,
    getEducationFailure,
  } from "../reducers/EducationSlice";
  
  import api from "../../utils/api";
  
  export const fetchEducation = () => async (dispatch) => {
    try {
      dispatch(getEducationStart());
      const response = await api.get("/api/education/");
      console.log(response);
      dispatch(getEducationSuccess(response.data.Education));
    } catch (error) {
      dispatch(getEducationFailure(error.message));
    }
  };
  