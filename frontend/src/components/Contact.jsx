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

  return (
    <>
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
          transition:Bounce
        />
        <article className="contact active">
          <header>
            <h2 className="h2 article-title">Contact</h2>
          </header>

          <section className="mapbox" data-mapbox>
            <figure>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53580.27804018378!2d73.71591765!3d32.93074375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391f90e6e5066453%3A0xef87b72a42ae072d!2sJhelum%2C%20Punjab!5e0!3m2!1sen!2s!4v1721722385430!5m2!1sen!2s"
                width="400"
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
        </article>
      </>
    </>
  );
};

export default Contact;
