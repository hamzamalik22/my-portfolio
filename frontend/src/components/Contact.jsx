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
              dangerouslySetInnerHTML={{ __html: message }}
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
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          border-radius: 14px;
          text-align: center;
          text-decoration: none;
          color: var(--white-2);
          background: var(--border-gradient-onyx);
          box-shadow: var(--shadow-2);
          z-index: 1;
          transition: var(--transition-1);
        }

        .social-card::before {
          content: "";
          position: absolute;
          inset: 1px;
          background: var(--bg-gradient-jet);
          border-radius: inherit;
          z-index: -1;
          transition: var(--transition-1);
        }

        .social-card:hover {
          transform: translateY(-5px);
          background: var(--bg-gradient-yellow-1);
        }

        .social-card:hover::before {
          background: var(--bg-gradient-yellow-2);
        }

        .social-icon {
          font-size: 2.5rem;
          margin-bottom: 8px;
          color: var(--orange-yellow-crayola);
          transition: var(--transition-1);
        }

        .social-card:hover .social-icon {
          color: var(--white-2);
        }

        .social-name {
          font-size: var(--fs-6);
          font-weight: var(--fw-500);
          color: var(--light-gray);
          transition: var(--transition-1);
        }

        .social-card:hover .social-name {
          color: var(--white-2);
        }

        @media (max-width: 1024px) {
          .social-icon {
            font-size: 2rem;
          }

          .social-name {
            font-size: var(--fs-7);
          }
        }

        @media (max-width: 768px) {
          .social-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            padding: 10px;
            max-width: 200px;
            margin: 0 auto;
          }

          .social-card {
            aspect-ratio: 1;
            padding: 12px;
            border-radius: 50%;
          }

          .social-icon {
            font-size: 1.2rem;
            margin-bottom: 0;
          }

          .social-name {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .social-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
            padding: 8px;
            max-width: 160px;
          }
          
          .social-card {
            padding: 8px;
          }

          .social-icon {
            font-size: 1rem;
          }
        }
      `}</style>
    </>
  );
};

export default Contact;