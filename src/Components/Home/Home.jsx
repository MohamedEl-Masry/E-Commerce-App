import React, { useContext, useEffect, useState } from "react";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import axios from "axios";
import StarRating from "../StarRating/StarRating";
import { Link } from "react-router-dom";
import SliderCarousel from "../SliderCarousel/SliderCarousel";
import SliderCategories from "../SliderCategories/SliderCategories";
import { wishlistContext } from "../../Context/WishlistContext";

const Home = () => {
  const { addToWishlist } = useContext(wishlistContext);
  const [allProducts, setAllProducts] = useState(null);
  let getAllProducts = async function () {
    try {
      const { data } = await axios.get(
        "https://route-ecommerce.onrender.com/api/v1/products"
      );
      setAllProducts(data.data);
    } catch (err) {
      console.log('Error',err);
    }
  };
  useEffect(function () {
    getAllProducts();
  }, []);

  return (
    <>
      {allProducts ? (
        <div className="home container mt-5 pt-5">
          <SliderCarousel />
          <SliderCategories />
          <div className="row">
            {allProducts.map(function (product, idx) {
              return (
                <div className="col-md-2 my-3 " key={idx}>
                  <div className="product p-2 bg-body-tertiary rounded-2 shadow position-relative">
                    <div className="position-absolute top-0 end-0 z-1 i-wishlist fs-4 text-center">
                      <div
                        onClick={() => {
                          addToWishlist(product.id);
                        }}
                      >
                        <i className="fa-regular fa-heart"></i>
                      </div>
                    </div>
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.imageCover}
                        className="w-100 rounded-2 my-1"
                        alt={product.title}
                      />
                      <div className="pt-2">
                        <h6 className="font-sm fw-bold text-main">
                          {product.category.name}
                        </h6>
                        <h6 className="font-smaller">
                          {product.title.split(" ").slice(0, 2).join(" ")}
                        </h6>
                        <h6 className="font-smaller">
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
                          <span>{product.ratingsAverage}</span>
                          {
                            <StarRating
                              rate={Math.round(product.ratingsAverage)}
                            />
                          }
                        </div>
                        <div className="d-flex justify-content-center">
                          <button className="btn bg-main text-white w-75">
                            Details
                          </button>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <LoadingScreen />
      )}
      ;
    </>
  );
};

export default Home;
