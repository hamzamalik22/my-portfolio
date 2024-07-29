import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEducation } from "../store/actions/EducationActions";
import { fetchExperience } from "../store/actions/ExperienceActions";
import { fetchSkill } from "../store/actions/SkillActions";
import Loader from "./Loader";
import TechStack from "./TechStack";

const Resume = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.education);
  const { expList, expLoading, expError } = useSelector(
    (state) => state.experience
  );
  const { skillList, skillLoading, skillError } = useSelector(
    (state) => state.skill
  );

  useEffect(() => {
    if (list.length === 0) {
      dispatch(fetchEducation());
    }
    if (expList.length === 0) {
      dispatch(fetchExperience());
    }
    if (skillList.length === 0) {
      dispatch(fetchSkill());
    }
  }, [dispatch, list.length, expList.length, skillList.length]);

  if (loading || expLoading || skillLoading)
    return (
      <>
        <Loader />
      </>
    );
  if (error || expError || skillError)
    return <p>Error: {error || expError || skillError}</p>;

  return (
    <article className="resume active">
      <header>
        <h2 className="h2 article-title">Resume</h2>
      </header>

      <section className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <ion-icon name="book-outline"></ion-icon>
          </div>
          <h3 className="h3">Education</h3>
        </div>

        <ol className="timeline-list">
          {list.map((item, index) => (
            <li key={index} className="timeline-item">
              <h4 className="h4 timeline-item-title">{item.school_name}</h4>
              <span>
                {item.start_year} — {item.end_year}
              </span>
              <p className="timeline-text">{item.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <ion-icon name="book-outline"></ion-icon>
          </div>
          <h3 className="h3">Experience</h3>
        </div>

        <ol className="timeline-list">
          {expList.map((item, index) => (
            <li key={index} className="timeline-item">
              <h4 className="h4 timeline-item-title">{item.job_title}</h4>
              <span>
                {item.start_year} — {item.end_year}
              </span>
              <p className="timeline-text">{item.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <ion-icon name="hammer-outline"></ion-icon>
          </div>
          <h3 className="h3">Tech Stack</h3>
        </div>

        <div>
          <TechStack />
        </div>
      </section>

      <section className="skill">
        <h3 className="h3 skills-title">My skills</h3>
        <ul className="skills-list content-card">
          {skillList.map((item, index) => (
            <li key={index} className="skills-item">
              <div className="title-wrapper">
                <h5 className="h5">{item.name}</h5>
                <data value="80">{item.level_in_percent}%</data>
              </div>
              <div className="skill-progress-bg">
                <div
                  className="skill-progress-fill"
                  style={{ width: `${item.level_in_percent}%` }}
                ></div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
};

export default Resume;
