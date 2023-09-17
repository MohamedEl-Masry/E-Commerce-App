import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const SliderCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay: true,
  };
  return (
    <>
      <div className="row mb-4">
        <div className="col-md-12 my-2">
          <div>
            <Slider {...settings}>
              <div className=" mb-2">
                <img
                  src={require("../../images/slider-2.jpeg")}
                  alt="slider"
                  className="w-100 rounded-3 shadow"
                  style={{ height: "300px" }}
                />
              </div>
              <div className="">
                <img
                  style={{ height: "300px" }}
                  src={require("../../images/banner-4.jpeg")}
                  alt="slider"
                  className="w-100 rounded-3 shadow"
                />
              </div>
              <div className="">
                <img
                  style={{ height: "300px" }}
                  src={require("../../images/grocery-banner.png")}
                  alt="slider"
                  className="w-100 rounded-3 shadow"
                />
              </div>
              <div className="">
                <img
                  style={{ height: "300px" }}
                  src={require("../../images/grocery-banner-2.jpeg")}
                  alt="slider"
                  className="w-100 rounded-3 shadow"
                />
              </div>
              <div className="">
                <img
                  style={{ height: "300px" }}
                  src={require("../../images/slider-image-2.jpeg")}
                  alt="slider"
                  className="w-100 rounded-3 shadow"
                />
              </div>
              <div className="">
                <img
                  style={{ height: "300px" }}
                  src={require("../../images/slider-image-3.jpeg")}
                  alt="slider"
                  className="w-100 rounded-3 shadow"
                />
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default SliderCarousel;
