import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";

const StarRating = (props) => {
  const [rating, setRating] = useState(props.rate);

  const handleRating = (rate) => {
    setRating(rate);
  };

  return (
    <>
      <div className="rating">
        <Rating
          onClick={handleRating}
          initialValue={rating}
          className=" w-100"
        />
      </div>
    </>
  );
};

export default StarRating;
