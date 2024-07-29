import {
    getProjectStart,
    getProjectSuccess,
    getProjectFailure,
  } from "../reducers/ProjectSlice";
  
  import api from "../../utils/api";
  
  export const fetchProject = () => async (dispatch) => {
    try {
      dispatch(getProjectStart());
      const response = await api.get("/api/project/");
      console.log(response);
      dispatch(getProjectSuccess(response.data.Project));
    } catch (error) {
      dispatch(getProjectFailure(error.message));
    }
  };
  