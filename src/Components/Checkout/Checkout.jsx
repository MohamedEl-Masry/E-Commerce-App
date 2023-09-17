import { useFormik } from "formik";
import React, { useContext } from "react";
import { cartContext } from "../../Context/CartContext";

const Checkout = () => {
  const { onlinePayment, cartId } = useContext(cartContext);
  const handleSubmit = async (values) => {
    await onlinePayment(cartId, values);
  };

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: handleSubmit,
  });
  return (
    <>
      <div className="my-5 pt-3">
        <div className="w-50 mx-auto p-5 my-5 bg-success-subtle special-color rounded-3 shadow">
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="details" className="ps-1 text-main fs-5 fw-bold">
              Details :{" "}
            </label>
            <input
              type="text"
              className="form-control mb-3"
              value={formik.values.details}
              onChange={formik.handleChange}
              name="details"
              id="details"
            />
            <label htmlFor="phone" className="ps-1 text-main fs-4 fw-bold">
              Phone :{" "}
            </label>
            <input
              type="tel"
              className="form-control mb-3"
              value={formik.values.phone}
              onChange={formik.handleChange}
              name="phone"
              id="phone"
            />
            <label htmlFor="city" className="ps-1 text-main fs-4 fw-bold">
              City :{" "}
            </label>
            <input
              type="text"
              className="form-control mb-3"
              value={formik.values.city}
              onChange={formik.handleChange}
              name="city"
              id="city"
            />
            <button
              className="btn bg-main text-white my-3 w-25 fs-5 "
              type="submit"
            >
              Pay
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Checkout;
