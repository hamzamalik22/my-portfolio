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
            {/* <ul className="filter-list">
              <li className="filter-item">
                <button className="active" data-filter-btn>
                  All
                </button>
              </li>

              <li className="filter-item">
                <button data-filter-btn>Web design</button>
              </li>

              <li className="filter-item">
                <button data-filter-btn>Applications</button>
              </li>

              <li className="filter-item">
                <button data-filter-btn>Web development</button>
              </li>
            </ul>

            <div className="filter-select-box">
              <button className="filter-select" data-select>
                <div className="select-value" data-selecct-value>
                  Select category
                </div>

                <div className="select-icon">
                  <ion-icon name="chevron-down"></ion-icon>
                </div>
              </button>

              <ul className="select-list">
                <li className="select-item">
                  <button data-select-item>All</button>
                </li>

                <li className="select-item">
                  <button data-select-item>Web design</button>
                </li>

                <li className="select-item">
                  <button data-select-item>Applications</button>
                </li>

                <li className="select-item">
                  <button data-select-item>Web development</button>
                </li>
              </ul>
            </div> */}

            <ul className="project-list">
              {list.map((item, index) => (
                <li key={index} className="project-item  active">
                  <a target="_blank" href={item.link}>
                    <figure className="project-img">
                      <div className="project-item-icon-box">
                        <ion-icon name="eye-outline"></ion-icon>
                      </div>

                      <img
                        src={item.featured_image}
                        alt={item.title}
                        loading="lazy"
                      />
                    </figure>

                    <h3 className="project-title">{item.title}</h3>

                    <p className="project-category">{item.category.title}</p>
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
