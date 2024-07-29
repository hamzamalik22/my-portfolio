import React from "react";
import { InfinitySpin, LineWave } from "react-loader-spinner";

const Loader = () => {
  return (
    <>
      <div className="h-screen w-[100%] flex justify-center items-center">
        <InfinitySpin
          visible={true}
          width="200"
          color="#0094F5"
          ariaLabel="infinity-spin-loading"
        />
      </div>
    </>
  );
};

export default Loader;
