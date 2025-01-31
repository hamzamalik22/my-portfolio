import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createMessage } from "../store/actions/FormActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const handleForm = async (data) => {
    try {
      console.log(data);
      dispatch(createMessage(data));
      toast.success("Message Sent");
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const socialLinks = [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/hamzamalik22", icon: "logo-linkedin", color: "#0A66C2" },
    { name: "Instagram", url: "https://instagram.com/mayaxhamzamalik", icon: "logo-instagram", color: "#E4405F" },
    { name: "GitHub", url: "https://github.com/hamzamalik22", icon: "logo-github", color: "#181717" },
  ];

  return (
    <>
      <ToastContainer
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <article className="contact active">
        <header>
          <h2 className="h2 article-title">Contact</h2>
        </header>

        <section className="mapbox" data-mapbox>
          <figure>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53580.27804018378!2d73.71591765!3d32.93074375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391f90e6e5066453%3A0xef87b72a42ae072d!2sJhelum%2C%20Punjab!5e0!3m2!1sen!2s!4v1721722385430!5m2!1sen!2s"
              width="100%"
              height="300"
              allowFullScreen=""
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </figure>
        </section>

        <section className="contact-form">
          <h3 className="h3 form-title">Contact Form</h3>

          <form className="form" onSubmit={handleSubmit(handleForm)}>
            <div className="input-wrapper">
              <input
                {...register("name")}
                type="text"
                name="name"
                className="form-input"
                placeholder="Full name"
                required
                data-form-input
              />

              <input
                {...register("email")}
                type="email"
                name="email"
                className="form-input"
                placeholder="Email address"
                required
                data-form-input
              />
            </div>

            <textarea
              {...register("message")}
              name="message"
              className="form-input"
              placeholder="Your Message"
              required
              data-form-input
            ></textarea>

            <button className="form-btn" type="submit">
              <ion-icon name="paper-plane"></ion-icon>
              <span>Send Message</span>
            </button>
          </form>
        </section>

        <section className="social-links">
          <div className="social-grid">
            {socialLinks.map(({ name, url, icon, color }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-card"
                style={{ backgroundColor: color }}
              >
                <ion-icon name={icon} className="social-icon"></ion-icon>
                <span className="social-name">{name}</span>
              </a>
            ))}
          </div>
        </section>
      </article>

      <style jsx>{`
        .social-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 16px;
          padding: 16px;
        }

        .social-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          border-radius: 12px;
          text-align: center;
          text-decoration: none;
          color: #fff;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .social-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }

        .social-icon {
          font-size: 2.5rem; /* Use rem for scalable sizing */
          margin-bottom: 8px;
          transition: font-size 0.3s ease; /* Smooth transition for icon size */
        }

        .social-name {
          font-size: 1rem; /* Use rem for scalable sizing */
          font-weight: 500;
        }

        @media (max-width: 1024px) {
          .social-icon {
            font-size: 2rem; /* Slightly smaller icons for tablets */
          }

          .social-name {
            font-size: 0.9rem;
          }
        }

        @media (max-width: 768px) {
          .social-icon {
            font-size: 1.5rem; /* Smaller icons for mobile */
          }

          .social-name {
            font-size: 0.8rem;
          }
        }

        @media (max-width: 480px) {
        .social-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 16px;
          padding: 16px;
        }
          .social-icon {
            font-size: 1.2rem; /* Even smaller icons for very small screens */
          }

          .social-name {
            font-size: 0.7rem;
          }
        }
      `}</style>
    </>
  );
};

export default Contact;