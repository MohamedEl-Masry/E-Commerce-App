import React from "react"

const LoadingScreen = () => {
  return (
    <>
        <div className="vh-100 bg-body-tertiary opacity-75 d-flex justify-content-center align-items-center">
            <i className="fa-solid fa-spinner fa-spin fa-7x "></i>
        </div>
    </>
  )
};

export default LoadingScreen;
