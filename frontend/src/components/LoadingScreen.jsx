import React, { useEffect, useState } from "react";
import "../styles/loadingScreen.css";

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="relative h-screen">
        <div className="absolute top-[40%] left-[40%] md:top-[38%] transform -translate-x-1/2 -translate-y-1/2 text-white flex items-center gap-2">
          <h5 className="cursive text-sm md:text-lg">
            &lt; {progress.toString().padStart(2, "0")}
          </h5>
          <h6 className="cursive text-sm md:text-lg">- 100  / &gt;</h6>
        </div>
        <div className="unique-main bg-black/75">
          <h1 className="unique-h1">
            WELCOME{" "}
            <div className="unique-roller">
              <span id="unique-rolltext">
                Your
                <br />
                Web Experience
                <br />
                is loading right now
                <br />
              </span>
              <span id="unique-spare-time">Nawa Aya HAI Sohneya?</span>
              <br />
            </div>
          </h1>
        </div>
      </div>
    </>
  );
};

export default LoadingScreen;
