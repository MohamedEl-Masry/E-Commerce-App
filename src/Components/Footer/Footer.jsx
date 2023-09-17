import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="footer bg-body-tertiary py-3 bottom-0 w-100">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="mx-4 ps-2">
                <h6 className="fw-bolder">Get the Fresh Cart app</h6>
                <p className="text-secondary mb-1 font-sm">
                  We will send you a link, open it on your phone to download the
                  app
                </p>
              </div>
              <div className="d-flex my-2">
                <input
                  type="email"
                  className="form-control w-75 my-1 py-1 mx-auto"
                  placeholder="Email ..."
                />
                <button className="btn btn-outline-success m-auto px-4 py-1">
                  Share App Link
                </button>
              </div>
              <div className=" my-3 py-2 ps-4 pe-4">
                <div className="d-flex justify-content-between align-items-center border-top border-bottom border-1 ">
                  <div className="left-footer d-flex ps-3 align-items-center">
                    <h6 className="fw-bold">Payment Partners</h6>
                    <i className="fa-brands fa-amazon-pay ms-2 fs-4 cursor-pointer"></i>
                    <i className="fa-brands fa-cc-mastercard ms-2 fs-4 cursor-pointer"></i>
                    <i className="fa-brands fa-paypal ms-2 fs-4 cursor-pointer"></i>
                  </div>
                  <div className="right-footer d-flex align-items-center pe-3">
                    <h6 className="fw-bold me-2">
                      Get deliveries with FreshCart
                    </h6>
                    <Link
                      target="_blank"
                      to="https://www.apple.com/app-store/"
                      className="d-flex bg-dark text-white m-2 align-items-center py-1 px-3 rounded-2 cursor-pointer"
                    >
                      <i className="fa-brands fa-app-store fs-3 me-3"></i>
                      <div className="">
                        <p className="font-sm my-0">Available on the</p>
                        <p className="fw-bold my-0 color-hover">App Store</p>
                      </div>
                    </Link>
                    <Link
                      target="_blank"
                      to="https://play.google.com"
                      className="d-flex bg-dark text-white m-2 align-items-center py-1 px-3 rounded-2 cursor-pointer"
                    >
                      <i className="fa-brands fa-google-play fs-3 me-3"></i>
                      <div className="">
                        <p className="font-sm my-0">GET IT ON</p>
                        <p className="fw-bold my-0 color-hover">Google Play</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
