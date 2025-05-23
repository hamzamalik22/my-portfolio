import React, { useEffect, useState } from "react";
import imgs from "../utils/images";
import { useDispatch, useSelector } from "react-redux";
import { fetchAbout } from "../store/actions/AboutActions";
import { fetchTestimonial } from "../store/actions/TestimonialActions";
import Loader from "./Loader";

const About = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.about);
  const { testList, testLoading, testError } = useSelector(
    (state) => state.testimonial
  );

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  // useEffect(() => {
  //   if (!list || list.length === 0) {
  //     dispatch(fetchAbout());
  //   }
  //   if (!testList || testList.length === 0) {
  //     dispatch(fetchTestimonial());
  //   }
  // }, [dispatch, list, testList]);


  useEffect(() => {
    if (Array.isArray(list) && list.length === 0) {
      dispatch(fetchAbout());
    }
    if (Array.isArray(testList) && testList.length === 0) {
      dispatch(fetchTestimonial());
    }
  }, [dispatch, list, testList]);
  
  // console.log(`This is response : ${[list]}`);

  const {
    para1,
    para2,
    service_1_title,
    service_1_description,
    service_2_title,
    service_2_description,
    service_3_title,
    service_3_description,
    service_4_title,
    service_4_description,
  } = list || {};

  const openModal = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedTestimonial(null);
  };

  if (loading || testLoading)
    return (
      <>
        <Loader />
      </>
    );
  if (error || testError) return <p>Error: {error || testError}</p>;
  if (!list || !testList) return <Loader />;

  return (
    <>
      <article className="about active">
        <header>
          <h2 className="h2 article-title">About me</h2>
        </header>

        <section className="about-text">
          <p dangerouslySetInnerHTML={{ __html: para1 }} />
          <p dangerouslySetInnerHTML={{ __html: para2 }} />
        </section>

        <section className="service">
          <h3 className="h3 service-title">What I'm doing</h3>

          <ul className="service-list">
            <li className="service-item">
              <div className="service-icon-box">
                <img src={imgs.icon_design} alt="design icon" width="40" />
              </div>

              <div className="service-content-box">
                <h4 className="h4 service-item-title">{service_1_title}</h4>
                <p className="service-item-text" dangerouslySetInnerHTML={{ __html: service_1_description }} />
              </div>
            </li>

            <li className="service-item">
              <div className="service-icon-box">
                <img
                  src={imgs.icon_dev}
                  alt="Web development icon"
                  width="40"
                />
              </div>

              <div className="service-content-box">
                <h4 className="h4 service-item-title">{service_2_title}</h4>
                <p className="service-item-text" dangerouslySetInnerHTML={{ __html: service_2_description }} />
              </div>
            </li>

            <li className="service-item">
              <div className="service-icon-box">
                <img src={imgs.icon_app} alt="mobile app icon" width="60" />
              </div>

              <div className="service-content-box">
                <h4 className="h4 service-item-title">{service_3_title}</h4>
                <p className="service-item-text" dangerouslySetInnerHTML={{ __html: service_3_description }} />
              </div>
            </li>

            <li className="service-item">
              <div className="service-icon-box">
                <img src={imgs.icon_photo} alt="camera icon" width="40" />
              </div>

              <div className="service-content-box">
                <h4 className="h4 service-item-title">{service_4_title}</h4>
                <p className="service-item-text" dangerouslySetInnerHTML={{ __html: service_4_description }} />
              </div>
            </li>
          </ul>
        </section>

        <section className="testimonials">
          <h3 className="h3 testimonials-title">Few Nice Words</h3>

          <ul className="testimonials-list has-scrollbar">
            {Array.isArray(testList) && testList.map((item, index) => (
              <li
                key={index}
                className="testimonials-item"
                onClick={() => openModal(item)}
              >
                <div className="content-card" data-testimonials-item>
                  <figure className="testimonials-avatar-box">
                    <img
                      src={
                        item.gender === "Male" ? imgs.avatar_1 : imgs.avatar_2
                      }
                      alt=""
                      width="60"
                    />
                  </figure>

                  <h4
                    className="h4 testimonials-item-title"
                    data-testimonials-title
                  >
                    {item.name}
                  </h4>

                  <div className="testimonials-text" data-testimonials-text>
                    <p dangerouslySetInnerHTML={{ __html: item.message }} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {isModalOpen && selectedTestimonial && (
          <div className="modal-container active">
            <div className="overlay" onClick={closeModal}></div>

            <section className="testimonials-modal">
              <button className="modal-close-btn" onClick={closeModal}>
                <ion-icon name="close-outline"></ion-icon>
              </button>

              <div className="modal-img-wrapper">
                <figure className="modal-avatar-box">
                  <img
                    src={
                      selectedTestimonial.gender === "Male"
                        ? imgs.avatar_1
                        : imgs.avatar_2
                    }
                    alt={selectedTestimonial.name}
                    width="80"
                    data-modal-img
                  />
                </figure>

                <img src={imgs.icon_quote} alt="quote icon" />
              </div>

              <div className="modal-content">
                <h4 className="h3 modal-title" data-modal-title>
                  {selectedTestimonial.name}
                </h4>

                <time dateTime={selectedTestimonial.date}>{selectedTestimonial.date}</time>

                <div data-modal-text>
                  <p dangerouslySetInnerHTML={{ __html: selectedTestimonial.message }} />
                </div>
              </div>
            </section>
          </div>
        )}
      </article>
    </>
  );
};

export default About;
