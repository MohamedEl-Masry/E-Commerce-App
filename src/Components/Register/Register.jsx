import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  let user = {
    name: "",
    email: "",
    phone: "",
    password: "",
    rePassword: "",
  };
  let navigate = useNavigate();
  let newUser = async function (userData) {
    try {
      let { data } = await axios.post(
        "https://route-ecommerce.onrender.com/api/v1/auth/signup",
        userData
      );

      if (data.message === "success") {
        navigate("/login");
        setIsLoading(false);
        toast.success(data.message, {
          duration: 2000,
          className: "mt-5",
        });
      }
    } catch (err) {
      toast.error(err.response.data.message, {
        duration: 4000,
        className: "mt-5",
      });
      document.querySelector(".errMsg").classList.remove("d-none");
      document.querySelector(".errMsg").innerHTML = err.response.data.message;
      setIsLoading(false);
    }
  };
  let formik = useFormik({
    initialValues: user,
    onSubmit: (values) => {
      newUser(values);
      setIsLoading(true);
    },
    validate: function (values) {
      let errors = {};
      if (values.name.length < 3 || values.name.length > 10) {
        errors.name = "name must be more than 3 characters and less than 10";
      }
      if (!values.email.includes("@") || !values.email.includes(".com")) {
        errors.email = "email must be includs @ and .com";
      }
      if (values.password.length < 8 || values.password.length > 15) {
        errors.password = "password must be 8 to 15 characters";
      }
      if (values.rePassword !== values.password) {
        errors.rePassword = "re-password dosn't match the password";
      }
      if (!values.phone.match(/^01[0125][0-9]{8}$/)) {
        errors.phone = "phone must be egyption number";
      }
      return errors;
    },
  });

  return (
    <>
      <div className="container my-5 pt-2">
        <div className="row my-5">
          <div className="col-md-12">
            <div className="bg-radialGradient rounded-3 p-5 shadow">
              <form onSubmit={formik.handleSubmit}>
                <h3 className="fw-bolder text-main">Register Now :</h3>
                <div className="errMsg d-none alert alert-danger text-center py-2">
                  Error msg
                </div>
                <label className="ps-2 pb-1 mt-3 fw-bold" htmlFor="name">
                  Name
                </label>
                <input
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  type="text"
                  id="name"
                  placeholder="Name"
                  className="form-control"
                />
                {formik.errors.name && formik.touched.name ? (
                  <div className="alert alert-danger py-1 mt-1 mb-1 ">
                    {formik.errors.name}
                  </div>
                ) : (
                  ""
                )}
                <label className="ps-2 pb-1 mt-3 fw-bold" htmlFor="email">
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
                <label className="ps-2 pb-1 mt-3 fw-bold" htmlFor="phone">
                  Phone
                </label>
                <input
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  type="numper"
                  id="phone"
                  placeholder="Phone"
                  className="form-control"
                />
                {formik.errors.phone ? (
                  <div className="alert alert-danger py-1 mt-1 mb-1 ">
                    {formik.errors.phone}
                  </div>
                ) : (
                  ""
                )}
                <label className="ps-2 pb-1 mt-3 fw-bold" htmlFor="password">
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
                <label className="ps-2 pb-1 mt-3 fw-bold" htmlFor="rePassword">
                  rePassword
                </label>
                <input
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.rePassword}
                  type="password"
                  id="rePassword"
                  placeholder="rePassword"
                  className="form-control"
                  autoComplete=""
                />
                {formik.errors.rePassword && formik.touched.rePassword ? (
                  <div className="alert alert-danger py-1 mt-1 mb-1 ">
                    {formik.errors.rePassword}
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
                    className="btn bg-main mt-3 text-white px-3 py-2"
                  >
                    Register
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

export default Register;
