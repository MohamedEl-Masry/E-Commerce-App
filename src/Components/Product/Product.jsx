import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import StarRating from "../StarRating/StarRating";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { useParams } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";

const Product = () => {
  const { addToCart, setNumOfCartItem } = useContext(cartContext);
  const { id } = useParams();
  const [allProductData, setAllProductData] = useState(null);
  let productData = async function () {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      setNumOfCartItem(data.numOfCartItems);
      setAllProductData(data.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(function () {
    productData();
  }, []);

  return (
    <>
      {allProductData ? (
        <div className="container m-5 py-5">
          <div className="row gx-5">
            <div className="col-md-4 ">
              <div className="row gx-3 bg-body-tertiary rounded-2 shadow">
                <div className="col-md-3 my-3">
                  <div className="row">
                    <div className="col-md-12">
                      {allProductData.images.map((pic, idx) => {
                        return (
                          <div className="p-1" key={idx}>
                            <img
                              src={pic}
                              alt={allProductData.brand.name}
                              className="w-100 rounded-2"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="col-md-8 m-auto">
                  <div className="py-4">
                    <img
                      src={allProductData.imageCover}
                      alt={allProductData.title}
                      className="w-100 rounded-3"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-8 d-flex justify-content-center align-items-center ">
              <div className="bg-body-tertiary rounded-2 shadow pt-4 pb-2">
                <div className="ps-5 pt-2">
                  <h2 className="text-main fw-bold">{allProductData.title}</h2>
                  <h5>{allProductData.description}</h5>
                  <h4>Quantity : {allProductData.quantity}</h4>
                  <h4>
                    Price :{" "}
                    {allProductData.priceAfterDiscount ? (
                      <>
                        <span className="text-decoration-line-through me-2">
                          {allProductData.price}
                        </span>
                        <span>{allProductData.priceAfterDiscount}</span>
                      </>
                    ) : (
                      allProductData.price
                    )}{" "}
                    L.E
                  </h4>
                  <h4 className="d-flex">
                    Rate :{" "}
                    <span className="ps-2 pe-5">
                      {allProductData.ratingsAverage}
                    </span>
                    {
                      <span className="">
                        <StarRating
                          rate={Math.round(allProductData.ratingsAverage)}
                        />
                      </span>
                    }
                  </h4>
                  <div className="d-flex justify-content-center my-5">
                    <button
                      onClick={() => {
                        addToCart(allProductData._id);
                      }}
                      className="btn bg-main text-white w-75"
                    >
                      Add Product to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default Product;
