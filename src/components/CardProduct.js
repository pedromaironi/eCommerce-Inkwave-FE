import { React, useState, useEffect } from "react";
import { HiOutlineShoppingCart, HiShoppingCart } from "react-icons/hi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { addToCart } from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductFavorite,
  removeProductFavorite,
  addProductRating,
} from "../actions/cardActions";
const CardProduct = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showbtn, setShowbtn] = useState(false);
  const [Incart, setIncart] = useState(false);
  const [rating, setRating] = useState(product.calificacion); // State to hold the rating
  const dispatch = useDispatch();
  const Cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userLogin);
  const productList = useSelector((state) => state.productList);
  const { products } = productList;
  const { cartItems } = Cart;
  const [forceUpdate, setForceUpdate] = useState(false);
  const toggleFavorite = (id) => {
    setIsFavorite(!isFavorite);
    if (isFavorite) {
      dispatch(removeProductFavorite(id));
    } else {
      dispatch(addProductFavorite(id));
    }
  };
  useEffect(() => {
    const isincart = cartItems.find((x) => x.product === product.id);
    if (isincart) {
      setIncart(true);
    }
    return () => {};
  }, [cartItems, product.id]);

  const addcart = () => {
    setIncart(true);
    dispatch(addToCart(product.id, 1));
  };

  useEffect(() => {
    // Check if the product has favorite
    const productWithFavorite = products.find((p) => p.id === product.id);
    if (productWithFavorite && productWithFavorite.tiene_favorito === 1) {
      setIsFavorite(true);
    }
  }, [products, product.id]);

  const handleCardProductRatingChange = (newRating) => {
    setRating(newRating); // Actualiza el estado del rating en CardProduct
  };

  return (
    <>
      <div
        className="cardProduct"
        onMouseOver={() => {
          setShowbtn(true);
        }}
        onMouseLeave={() => {
          setShowbtn(false);
        }}
      >
        <div className="imgDiv">
          <Image
            className="imgProduct"
            boxSize="350px"
            objectFit="cover"
            src={product.imagen}
          />
        </div>
        <div className="bottomcard">
          <Link to={`/product/${product.id}`} exact={"true"}>
            <span>{product.nombre}</span>
          </Link>

          <div className="icons">
            {userInfo ? (
              isFavorite ? (
                <AiFillHeart
                  className="iconFav"
                  color="black"
                  size="26"
                  onClick={() => toggleFavorite(product.id)}
                />
              ) : (
                <AiOutlineHeart
                  className="iconFav"
                  color="#999"
                  size="26"
                  onClick={() => toggleFavorite(product.id)}
                />
              )
            ) : (
              ""
            )}

            {Incart ? (
              <HiShoppingCart className="iconFav" size="26" />
            ) : (
              <HiOutlineShoppingCart
                className="iconFav"
                color="#999"
                size="26"
                onClick={addcart}
              />
            )}
          </div>
          <div className="productpricecard"> {`${product.precio} $`}</div>
          <div className="Rating">
            {userInfo ? (
              <Rating
                value={rating}
                product={product}
                text={""}
                onRatingChange={handleCardProductRatingChange}
              />
            ) : null}
          </div>
        </div>

        <Link to={`/product/${product.id}`} exact={"true"}>
          <button
            className={showbtn ? "QuickView QuickViewActive" : "QuickView"}
          >
            {" "}
            Ver detalles
          </button>
        </Link>
      </div>
    </>
  );
};

export default CardProduct;
