import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import StarRating from "../StarRating/StarRating";
import { Link, useParams } from "react-router-dom";
import { wishlistContext } from "../../Context/WishlistContext";

const ProductsOfBrand = () => {
  const { addToWishlist } = useContext(wishlistContext);
  const { id } = useParams();
  const [allProducts, setAllProducts] = useState(null);
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products",
        { params: { brand: id } }
      );
      setAllProducts(data.data);
    } catch (error) {
      console.log("Error", error);
    }
  };
  useEffect(function () {
    getAllProducts();
  }, []);
  return (
    <>
      {allProducts ? (
        <div className="container pro-brands my-5 pt-5">
          <div className="row gx-3">
            {allProducts.length > 0 ? (
              allProducts.map(function (data, idx) {
                return (
                  <div className="col-md-3" key={idx}>
                    <div className="p-4 bg-body-tertiary rounded-2 position-relative shadow my-3">
                      <div className="position-absolute top-0 end-0 z-1 i-wishlist fs-4 text-center">
                        <div
                          onClick={() => {
                            addToWishlist(data.id);
                          }}
                        >
                          <i className="fa-regular fa-heart"></i>
                        </div>
                      </div>
                      <img
                        src={data.imageCover}
                        alt={data.title}
                        className="w-100 mb-3"
                      />
                      <h5>{data.title.split(" ").slice(0, 8).join(" ")}</h5>
                      <h5>
                        {" "}
                        Price:
                        {data.priceAfterDiscount ? (
                          <>
                            <span className="text-decoration-line-through me-2">
                              {data.price}
                            </span>
                            <span>{data.priceAfterDiscount}</span>
                          </>
                        ) : (
                          data.price
                        )}{" "}
                        L.E
                      </h5>
                      <div className="d-flex justify-content-between mb-2 ">
                        <span>{data.ratingsAverage}</span>
                        {<StarRating rate={Math.round(data.ratingsAverage)} />}
                      </div>
                      <Link to={`/product/${data.id}`}>
                        <div className="d-flex justify-content-center">
                          <button className="btn bg-main text-white w-75">
                            Details
                          </button>
                        </div>
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="rounded-3 bg-body-tertiary container my-5 pt-2">
                <div className="row">
                  <div className="col-md-12 px-4 pb-3">
                    <div className="row align-items-center">
                      <div className="col-md-10">
                        <h1>
                          Sorry ! There are no products in this brand yet You
                          can choose another brand from here
                        </h1>
                      </div>
                      <div className="col-md-2 d-flex justify-content-end">
                        <Link to={"/brands"}>
                          <div className="btn bg-main py-2 px-3 text-white fw-bold">
                            {" "}
                            Brands
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default ProductsOfBrand;
