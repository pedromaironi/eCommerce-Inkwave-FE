import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AiFillStar } from "react-icons/ai";
import { BsStarHalf, BsStar } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addProductRating } from "../actions/cardActions";

const Rating = ({ value, product, text, onRatingChange }) => {
  const [rating, setRating] = useState(0); // State to hold the rating
  const dispatch = useDispatch();

  useEffect(() => {
    // Set the calificacion based on the product's calificacion
    setRating(product.calificacion); // Assuming you have a field named "calificacion" in the product data
  }, [product.calificacion]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    onRatingChange(newRating);
    dispatch(addProductRating(product.id, newRating)); // Dispatch action to update the product's rating
  };

  return (
    <div className="product-rating">
      <span onClick={() => handleRatingChange(1)}>
        {" "}
        <i>
          {" "}
          {value >= 1 ? (
            <AiFillStar />
          ) : value >= 0.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}{" "}
        </i>
      </span>
      <span onClick={() => handleRatingChange(2)}>
        {" "}
        <i>
          {" "}
          {value >= 2 ? (
            <AiFillStar />
          ) : value >= 1.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}{" "}
        </i>{" "}
      </span>
      <span onClick={() => handleRatingChange(3)}>
        <i>
          {" "}
          {value >= 3 ? (
            <AiFillStar />
          ) : value >= 2.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}{" "}
        </i>
      </span>
      <span onClick={() => handleRatingChange(4)}>
        {" "}
        <i>
          {" "}
          {value >= 4 ? (
            <AiFillStar />
          ) : value >= 3.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}{" "}
        </i>
      </span>
      <span onClick={() => handleRatingChange(5)}>
        {" "}
        <i>
          {" "}
          {value >= 5 ? (
            <AiFillStar />
          ) : value >= 4.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}{" "}
        </i>{" "}
      </span>
      {/* <span>{value} ({text && text})</span> */}
    </div>
  );
};
Rating.propTypes = {
  value: PropTypes.number.isRequired,
  product: PropTypes.object.isRequired,
  onRatingChange: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default Rating;
