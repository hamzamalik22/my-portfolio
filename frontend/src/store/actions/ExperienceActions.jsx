import {
    getExperienceStart,
    getExperienceSuccess,
    getExperienceFailure,
  } from "../reducers/ExperienceSlice";
  
  import api from "../../utils/api";
  
  export const fetchExperience = () => async (dispatch) => {
    try {
      dispatch(getExperienceStart());
      const response = await api.get("/api/experience/");
      console.log(response);
      dispatch(getExperienceSuccess(response.data.Experience));
    } catch (error) {
      dispatch(getExperienceFailure(error.message));
    }
  };
  