import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "../components/About";
import Resume from "../components/Resume";
import Portfolio from "../components/Portfolio";
import Blog from "../components/Blog";
import Contact from "../components/Contact";
import NotFound from "../pages/NotFound";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<About />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
};

export default Router;
