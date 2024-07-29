import React, { useState, useEffect } from "react";
import "./styles/style.css";
import Router from "./routes/Router";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { useDispatch } from "react-redux";
import LoadingScreen from "./components/LoadingScreen";
import { fetchEducation } from "./store/actions/EducationActions";
import { fetchSkill } from "./store/actions/SkillActions";
import { fetchExperience } from "./store/actions/ExperienceActions";
import { fetchProject } from "./store/actions/ProjectActions";
import { Analytics } from "@vercel/analytics/react";

const App = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const isFirstLoad = localStorage.getItem("isFirstLoad") === null;

    if (isFirstLoad) {
      const loadData = async () => {
        dispatch(fetchEducation());
        dispatch(fetchExperience());
        dispatch(fetchSkill());
        dispatch(fetchProject());

        setTimeout(() => {
          setInitialLoading(false);
          localStorage.setItem("isFirstLoad", "false");
        }, 5000);
      };

      loadData();
    } else {
      setInitialLoading(false);
    }

    // Set a timeout to clear local storage after 2.5 minutes (150000 milliseconds)
    const clearLocalStorageTimeout = setTimeout(() => {
      localStorage.clear();
      localStorage.setItem("isFirstLoad", "false"); // Keep the isFirstLoad item
    }, 150000);

    // Cleanup the timeout if the component unmounts
    return () => clearTimeout(clearLocalStorageTimeout);
  }, [dispatch]);

  if (initialLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div>
        <main>
          <Sidebar />
          <div className="main-content">
            <Navbar />
            <Router />
          </div>
        </main>
      </div>
      <Analytics />
    </>
  );
};

export default App;
