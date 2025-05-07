import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../store/actions/ProfileActions";
import { FileDown } from "lucide-react";

const Sidebar = () => {
  const [isActive, setIsActive] = useState(false);
  const sidebarRef = useRef(null);
  const sidebarBtnRef = useRef(null);
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.profile);

  const {
    name,
    profile_picture,
    job_title,
    email,
    phone,
    date_of_birth,
    city,
    province,
    country,
    linkedin,
    instagram,
    github,
  } = list;

  useEffect(() => {
    if (list.length === 0) {
      dispatch(fetchProfile());
    }
  }, [dispatch, list.length]);

  const handleToggle = () => {
    setIsActive(!isActive);
    if (sidebarRef.current) {
      sidebarRef.current.classList.toggle("active");
    }
  };

  useEffect(() => {
    const sidebarBtn = sidebarBtnRef.current;
    if (sidebarBtn) {
      sidebarBtn.addEventListener("click", handleToggle);
    }

    return () => {
      if (sidebarBtn) {
        sidebarBtn.removeEventListener("click", handleToggle);
      }
    };
  }, [isActive]);

  if (loading) return <p>..</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <aside className="sidebar" data-sidebar ref={sidebarRef}>
      <div className="sidebar-info">
        <figure className="avatar-box overflow-hidden">
          <img src={profile_picture} alt="avatar" width="80" />
        </figure>

        <div className="info-content">
          <h1 className="name" title={name}>
            {name}
          </h1>

          <p className="title">{job_title}</p>
        </div>

        <button className="info_more-btn" data-sidebar-btn ref={sidebarBtnRef}>
          <span>Show Contacts</span>
          <ion-icon name="chevron-down"></ion-icon>
        </button>
      </div>

      <div className="sidebar-info_more">
        <div className="separator"></div>

        <ul className="contacts-list">
          <li className="contact-item">
            <div className="icon-box">
              <ion-icon name="mail-outline"></ion-icon>
            </div>
            <div className="contact-info">
              <p className="contact-title">Email</p>
              <a href={`mailto:${email}`} className="contact-link">
                {email}
              </a>
            </div>
          </li>
          {/* <li className="contact-item">
            <div className="icon-box">
              <ion-icon name="phone-portrait-outline"></ion-icon>
            </div>
            <div className="contact-info">
              <p className="contact-title">Phone</p>
              <a href={`tel:${phone}`} className="contact-link">
                {phone}
              </a>
            </div>
          </li> */}
          <li className="contact-item">
            <div className="icon-box">
              <ion-icon name="calendar-outline"></ion-icon>
            </div>
            <div className="contact-info">
              <p className="contact-title">Birthday</p>
              <time>{date_of_birth}</time>
            </div>
          </li>
          <li className="contact-item">
            <div className="icon-box">
              <ion-icon name="location-outline"></ion-icon>
            </div>
            <div className="contact-info">
              <p className="contact-title">Location</p>
              <address>
                {city}, {province}, {country}
              </address>
            </div>
          </li>
          <li className="contact-item">
            <a target="_blank"
              href="/Hamza_resume.pdf"
              className="resume_btn flex items-center justify-center gap-2 w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <FileDown size="20px" />
              <span>Resume</span>
            </a>
          </li>
        </ul>

        <div className="separator"></div>
        <div className="separator hidden min-[1250px]:block"></div>

        <ul className="social-list flex justify-center gap-4">
          <li className="social-item">
            <a target="_blank" href={linkedin} className="social-link">
              <ion-icon name="logo-linkedin"></ion-icon>
            </a>
          </li>
          <li className="social-item">
            <a target="_blank" href={instagram} className="social-link">
              <ion-icon name="logo-instagram"></ion-icon>
            </a>
          </li>
          <li className="social-item">
            <a target="_blank" href={github} className="social-link">
              <ion-icon name="logo-github"></ion-icon>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
