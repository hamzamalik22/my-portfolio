import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { combineReducers } from "redux";
import { thunk } from "redux-thunk"; // Named import
import ProfileReducer from "./reducers/ProfileSlice";
import AboutReducer from "./reducers/AboutSlice";
import TestimonialReducer from "./reducers/TestimonialSlice";
import EducationReducer from "./reducers/EducationSlice";
import ExperienceReducer from "./reducers/ExperienceSlice";
import SkillReducer from "./reducers/SkillSlice";
import ProjectReducer from "./reducers/ProjectSlice";
import FormReducer from "./reducers/FormSlice";

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  profile: ProfileReducer,
  about: AboutReducer,
  testimonial: TestimonialReducer,
  education: EducationReducer,
  experience: ExperienceReducer,
  skill: SkillReducer,
  project: ProjectReducer,
  contactForm: FormReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
});

export const persistor = persistStore(store);
