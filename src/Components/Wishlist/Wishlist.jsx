import React, { useContext } from "react";
import StarRating from "../StarRating/StarRating";

import { wishlistContext } from "../../Context/WishlistContext";
import { Link } from "react-router-dom";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

const Wishlist = ({ currentUser }) => {
  const { allMyWishlist, count, removProductFromWishlist } =
    useContext(wishlistContext);
  return (
    <>
      {allMyWishlist ? (
        <div className="container my-5 pt-5">
          <div className="row">
            <div className="col-md-12">
              <div className="totalDetails">
                <h2>
                  Wishlist : <span className="text-main">{count}</span>
                </h2>
              </div>
            </div>
          </div>
          <div className="container my-3">
            <div className="row gx-3">
              {allMyWishlist.map(function (data, idx) {
                return (
                  <div className="col-md-3" key={idx}>
                    <div className="p-4 bg-body-tertiary position-relative rounded-2 shadow my-3">
                      <div className="position-absolute top-0 end-0 me-1 mt-1 z-1 i-wishlist hover-clear fs-4 text-center">
                        <div
                          onClick={() => {
                            removProductFromWishlist(data.id);
                          }}
                        >
                          <i className="fa-regular fa-heart"></i>
                        </div>
                      </div>
                      <img
                        src={data.imageCover}
                        alt={data.title}
                        className="w-100 mb-2"
                      />
                      <h5>{data.title.split(" ").slice(0, 2).join(" ")}</h5>
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
              })}
            </div>
          </div>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default Wishlist;
