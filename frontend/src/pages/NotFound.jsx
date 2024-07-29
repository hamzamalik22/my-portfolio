import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <article className="blog active">
        <main class="absolute top-10 h-screen w-full flex flex-col justify-center items-center bg-[#0E1115]">
          <h1 class="text-9xl font-extrabold text-white tracking-widest">
            404
          </h1>
          <div class="bg-[#00AAFF] px-2 text-sm rounded rotate-12 absolute">
            Page Not Found
          </div>
          <button class="mt-5">
            <a class="relative inline-block text-sm font-medium text-[#00AAFF] group  focus:outline-none focus:ring">
              <span class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#0073E6] group-hover:translate-y-0 group-hover:translate-x-0"></span>

              <span class="relative block px-8 py-3 bg-[#1A2238] border border-current">
                <Link to="/">Go Home</Link>
              </span>
            </a>
          </button>
        </main>
      </article>
    </>
  );
};

export default NotFound;
