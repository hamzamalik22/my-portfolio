import {
    getSkillStart,
    getSkillSuccess,
    getSkillFailure,
  } from "../reducers/SkillSlice";
  
  import api from "../../utils/api";
  
  export const fetchSkill = () => async (dispatch) => {
    try {
      dispatch(getSkillStart());
      const response = await api.get("/api/skill/");
      console.log(response);
      dispatch(getSkillSuccess(response.data.Skill));
    } catch (error) {
      dispatch(getSkillFailure(error.message));
    }
  };
  