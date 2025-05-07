import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProject } from "../store/actions/ProjectActions";
import Loader from "./Loader";

const Portfolio = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.project);

  useEffect(() => {
    if (list.length === 0) {
      dispatch(fetchProject());
    }
  }, [dispatch, list.length]);

  if (loading)
    return (
      <>
        <Loader />
      </>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <>
        <article className="portfolio active">
          <header>
            <h2 className="h2 article-title">Portfolio</h2>
          </header>

          <section className="projects">
            <ul className="project-list">
              {list.map((item, index) => (
                <li key={index} className="project-item active">
                  <a target="_blank" href={item.link} className="project-link">
                    <figure className="project-img">
                      <div className="project-item-icon-box">
                        <ion-icon name="eye-outline"></ion-icon>
                      </div>

                      <img
                        src={item.featured_image}
                        alt={item.title}
                        loading="lazy"
                        className="project-img-cover"
                      />
                    </figure>

                    <div className="project-content">
                      <h3 className="project-title">{item.title}</h3>
                      <p className="project-category">{item.category.title}</p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </>
    </>
  );
};

export default Portfolio;
