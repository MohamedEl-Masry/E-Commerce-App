import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/freshcart-logo.svg";
import { cartContext } from "../../Context/CartContext";
const Navbar = ({ currentUser, clearUserData }) => {
  const navigateUser = useNavigate();
  const logOut = function () {
    clearUserData();
    navigateUser("/login");
  };

  const { numOfCartItems, cartProducts } = useContext(cartContext);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary position-fixed top-0 start-0 end-0 z-3">
        <div className="container-fluid px-5 align-items-center">
          <Link className="navbar-brand" to="/home">
            <img src={logo} alt="logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto align-items-center">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/brands">
                  Brands
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  target="_blank"
                  to="https://www.instagram.com/"
                >
                  <i className="fa-brands fa-instagram fs-5"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  target="_blank"
                  to="https://www.facebook.com/"
                >
                  <i className="fa-brands fa-facebook fs-5"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  target="_blank"
                  to="https://www.tiktok.com/"
                >
                  <i className="fa-brands fa-tiktok fs-5"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  target="_blank"
                  to="https://www.twitter.com/"
                >
                  <i className="fa-brands fa-twitter fs-5"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  target="_blank"
                  to="https://www.linkedin.com/"
                >
                  <i className="fa-brands fa-linkedin fs-5"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  target="_blank"
                  to="https://www.youtube.com/"
                >
                  <i className="fa-brands fa-youtube fs-5"></i>
                </Link>
              </li>

              {cartProducts ? (
                <>
                  <li className="nav-item position-relative p-2">
                    <Link className="nav-link " to="/cart">
                      <i className="fa-solid fa-cart-shopping fs-5 "></i>
                      <span className="badge text-success bg-success-subtle position-absolute top-0 end-0">
                        {numOfCartItems}
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item ms-1">
                    <Link className="nav-link" to="/wishlist">
                      Wishlist
                      <i className="fa-regular fa-heart ms-1 fs-5"></i>
                    </Link>
                  </li>
                  <li className="nav-item cursor-pointer">
                    <span onClick={logOut} className="nav-link log-out">
                      Log Out
                      <i className="fa-solid fa-right-from-bracket ms-1 fs-5"></i>
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
