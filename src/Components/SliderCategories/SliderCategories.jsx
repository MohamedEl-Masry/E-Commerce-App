import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
const SliderCategories = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay: true,
  };
  const [allCtegories, setAllCtegories] = useState([]);
  const getAllCtegories = async () => {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      setAllCtegories(data.data);
    } catch (error) {
      console.log("Error", error);
    }
  };
  useEffect(() => {
    getAllCtegories();
  }, []);

  return (
    <>
      {allCtegories ? (
        <div className="row my-4">
          <div className="col-md-12 my-2">
            <div className="shadow">
              <Slider {...settings}>
                {allCtegories.map((category, idx) => {
                  return (
                    <div
                      className="img-category bg-body-tertiary overflow-hidden"
                      key={idx}
                    >
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-100"
                      />
                      <p className="text-main fs-6 text-center mt-3 fw-bold font-smaller">
                        {category.name}
                      </p>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default SliderCategories;
