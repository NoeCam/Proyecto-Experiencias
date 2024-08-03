import React from "react";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-center text-5xl sm:text-9xl h1">
        404 <span className="text-yellow-500">E</span>rror
      </h1>
      <h2 className="text-center text-5xl sm:text-9xl h2">
        Page <span className="text-cyan-500">N</span>ot Found
      </h2>
    </div>
  );
};

export default PageNotFound;
