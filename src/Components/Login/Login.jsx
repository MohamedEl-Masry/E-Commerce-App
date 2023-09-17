import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = ({ getUserData }) => {
  const [isLoading, setISLoading] = useState(false);
  let user = {
    email: "",
    password: "",
  };
  let navigate = useNavigate();
  let loginUser = async function (userData) {
    try {
      let { data } = await axios.post(
        "https://route-ecommerce.onrender.com/api/v1/auth/signin",
        userData
      );
      if (data.message === "success") {
        navigate("/home");
        localStorage.setItem("tkn", data.token);
        getUserData();
        toast.success(data.message, {
          duration: 2000,
          className: "mt-5",
        });
        setISLoading(false);
      }
    } catch (err) {
      toast.error(err.response.data.message, {
        duration: 4000,
        className: "mt-5",
      });
      document.querySelector(".errMsg").classList.remove("d-none");
      document.querySelector(".errMsg").innerHTML = err.response.data.message;
      setISLoading(false);
    }
  };
  let formik = useFormik({
    initialValues: user,
    onSubmit: (values) => {
      loginUser(values);
      setISLoading(true);
    },
    validate: function (values) {
      let errors = {};

      if (!values.email.includes("@") || !values.email.includes(".com")) {
        errors.email = "email must be includs @ and .com";
      }
      if (values.password.length < 8 || values.password.length > 15) {
        errors.password = "password must be 8 to 15 characters";
      }
      return errors;
    },
  });

  return (
    <>
      <div className="container my-5 pt-5">
        <div className="row my-5">
          <div className="col-md-12">
            <div className="bg-radialGradient rounded-3 p-5 shadow">
              <form onSubmit={formik.handleSubmit}>
                <h3 className="fw-bolder text-main">Login Now :</h3>
                <div className="errMsg d-none alert alert-danger text-center py-2">
                  Email or Password incorrect
                </div>

                <label className="py-1 ps-2 mt-3 fw-bold" htmlFor="email">
                  Email
                </label>
                <input
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="form-control"
                />
                {formik.errors.email && formik.touched.email ? (
                  <div className="alert alert-danger py-1 mt-1 mb-1 ">
                    {formik.errors.email}
                  </div>
                ) : (
                  ""
                )}
                <label className="py-1 ps-2 mt-3 fw-bold" htmlFor="password">
                  Password
                </label>
                <input
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  type="password"
                  id="password"
                  placeholder="Password"
                  className="form-control"
                  autoComplete=""
                />
                {formik.errors.password && formik.touched.password ? (
                  <div className="alert alert-danger py-1 mt-1 mb-1 ">
                    {formik.errors.password}
                  </div>
                ) : (
                  ""
                )}
                {isLoading ? (
                  <button
                    type="button"
                    className="btn bg-main mt-3 px-5 py-2 spinner text-white"
                  >
                    <i className="fa-solid fa-spinner fa-spin "></i>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn bg-main mt-3 text-white px-4 py-2"
                  >
                    Login
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
