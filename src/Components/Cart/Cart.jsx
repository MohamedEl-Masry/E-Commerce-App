import React from "react";
import { useContext } from "react";
import { cartContext } from "../../Context/CartContext";

import StarRating from "../StarRating/StarRating";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    numOfCartItems,
    totalCartPrice,
    cartProducts,
    addToCart,
    clearItem,
    updateProductCount,
  } = useContext(cartContext);
  console.log("cartproduct", cartProducts);

  return (
    <>
      {cartProducts ? (
        <div className="container my-5 pt-5">
          <div className="row">
            <div className="col-md-10">
              <div className="totalDetails">
                <h2>
                  Shop Cart :{" "}
                  <span className="text-main">{numOfCartItems}</span>{" "}
                </h2>
                <h2>
                  Total Price :{" "}
                  <span className="text-main">{totalCartPrice} L.E</span>
                </h2>
              </div>
            </div>
            <div className="col-md-2">
              <div className="checkout d-flex align-items-center justify-content-end ">
                <button className="btn bg-main p-2 shadow" type="submit">
                  <Link to={"/checkout"} className="text-white fs-4">
                    Checkout
                  </Link>
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            {cartProducts.map((product, idx) => {
              return (
                <div className="col-md-3 my-3" key={idx}>
                  <div className=" p-2 bg-body-tertiary rounded-2 shadow">
                    <img
                      src={product.product.imageCover}
                      className="w-100"
                      alt={product.product.title}
                    />
                    <div className="pt-2 px-1">
                      <h6 className=" fw-bold text-main">
                        {product.product.category.name}
                      </h6>
                      <h6 className="">
                        {product.product.title.split(" ").slice(0, 2).join(" ")}
                      </h6>
                      <h6 className="">
                        Price :
                        {product.priceAfterDiscount ? (
                          <>
                            <span className="text-decoration-line-through me-2">
                              {product.price}
                            </span>
                            <span>{product.priceAfterDiscount}</span>
                          </>
                        ) : (
                          product.price
                        )}{" "}
                        L.E
                      </h6>
                      <div className="d-flex justify-content-between mb-2">
                        <span>{product.product.ratingsAverage}</span>
                        {
                          <StarRating
                            rate={Math.round(product.product.ratingsAverage)}
                          />
                        }
                      </div>
                      <div
                        className="my-3 cursor-pointer w-50 text-danger"
                        onClick={() => {
                          clearItem(product.product.id);
                        }}
                      >
                        <i className="fa-solid fa-trash-can me-2 fs-4 "></i>{" "}
                        <span className="fs-5 "> Delete</span>
                      </div>
                      <div className="my-2">
                        <div className="d-flex justify-content-center align-items-center">
                          <button
                            className="btn btn-outline-success fs-4 fw-bold py-1"
                            onClick={() => {
                              addToCart(product.product.id);
                            }}
                          >
                            +
                          </button>
                          <div className="count px-3 fs-4 fw-bold ">
                            {product.count}
                          </div>
                          <button
                            className="btn btn-outline-warning fs-4 fw-bold py-1"
                            onClick={() => {
                              if (product.count > 1) {
                                updateProductCount(
                                  product.product.id,
                                  product.count - 1
                                );
                              } else {
                                updateProductCount(
                                  product.product.id,
                                  (product.count = 1)
                                );
                              }
                            }}
                          >
                            -
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default Cart;
