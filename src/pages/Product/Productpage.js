/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef } from "react";
import Rating from "../../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";

import {
  listProductDetails,
  createproductReview,
} from "../../actions/productActions";
import { IoLogoFacebook } from "react-icons/io";
import { MdDoNotDisturb } from "react-icons/md";
import {
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillShop,
} from "react-icons/ai";
import {
  Image,
  Select,
  Button,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import HashLoader from "react-spinners/HashLoader";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_REVIEW_RESET,
} from "../../constants/productConstants";
import "./product.css";
import { Link } from "react-router-dom";
const Productpage = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setrating] = useState(0);
  const [comment, setcomment] = useState("");

  const imgs = document.querySelectorAll(".img-select a");
  const imgShowcase = useRef(null);
  const imgBtns = [...imgs];
  let imgId = 1;
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate;

  imgBtns.forEach((imgItem) => {
    imgItem.addEventListener("click", (event) => {
      event.preventDefault();
      imgId = imgItem.dataset.id;
      slideImage();
    });
  });

  function slideImage() {
    const displayWidth = document.querySelector(
      ".img-showcase img:first-child"
    ).clientWidth;
    imgShowcase.current.style.transform = `translateX(${
      -(imgId - 1) * displayWidth
    }px)`;
  }

  useEffect(() => {
    if (successProductReview) {
      alert("Review Submitted!");
      setrating(0);
      setcomment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, successProductReview]);

  const submithanlder = () => {
    dispatch(
      createproductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };
  //Handler of button add to cart
  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  console.log(useSelector((state) => console.log(state.productDetails)));
  return (
    <>
      <Helmet>
        <title>{product.nombre}</title>
      </Helmet>
      <div className="productpage">
        {loading ? (
          <div className="loading-product">
            <HashLoader color={"#1e1e2c"} loading={loading} size={50} />
          </div>
        ) : error ? (
          <h2>{error} </h2>
        ) : (
          <div className="card-wrapper">
            <div className="card">
              <div className="product-imgs">
                <div className="img-display">
                  <div ref={imgShowcase} className="img-showcase">
                    {/* {product.images.map((i) => (
                      <Image src={i} />
                    ))} */}
                    <Image src={product.imagen} />
                  </div>
                </div>
                <div className="img-select">
                  <div className="img-item">
                    <a href="#" data-id="1">
                      <Image
                        objectFit="cover"
                        boxSize="200px"
                        src={product.imagen}
                        alt="show image"
                      />
                    </a>
                  </div>
                  <div className="img-item">
                    <a href="#" data-id="2">
                      <Image
                        objectFit="cover"
                        boxSize="200px"
                        src={product.imagen}
                        alt="show image"
                      />
                    </a>
                  </div>
                  <div className="img-item">
                    <a href="#" data-id="3">
                      <Image
                        objectFit="cover"
                        boxSize="200px"
                        src={product.imagen}
                        alt="show image"
                      />
                    </a>
                  </div>
                </div>
              </div>

              <div className="product-content">
                <h2 className="product-title">{product.nombre} </h2>
                <Link to="/shop" className="product-link">
                  visit our store
                </Link>
                <Rating value={3} text={`${product.numReviews} reviews`} />
                <div className="product-price">
                  <p className="last-price">
                    Precio antiguo:{" "}
                    <span>${product.precio + product.precio}</span>
                  </p>
                  <p className="new-price">
                    Precio actual: <span>${product.precio} (50%)</span>
                  </p>
                </div>

                <div className="product-detail">
                  <h2>Acerca de este producto: </h2>
                  <p>{product.descripcion}</p>
                  <div>
                    <ul>
                      <li>Talla</li>{" "}
                      <Select
                        className="select-product"
                        placeholder="Elige una opcion"
                      >
                        {/* {product.talla.map((size) => (
                          <option value={size}>{size}</option>
                        ))} */}
                        <option value={product.talla_nombre}>
                          {product.talla_nombre}
                        </option>
                      </Select>
                    </ul>
                  </div>
                  <ul>
                    <li>
                      Estado:{" "}
                      <span>{product.stock > 0 ? "en stock" : "agotado"}</span>
                    </li>
                    <li>
                      Marca: <span>{product.marca_nombre}</span>
                    </li>
                    <li>
                      Color: <span>{product.detalle_color}</span>
                    </li>
                    <li>
                      Categoria:{" "}
                      <span>
                        {/* {product.category.map((cg) => " | " + cg + " | ")} */}
                        {product.categoria_nombre}
                      </span>
                    </li>
                    <li>
                      Zona de envío: <span>Por todo el mundo</span>
                    </li>
                    <div>
                      <ul>
                        {" "}
                        <li>Cantidad :</li>
                        {product.stock > 0 ? (
                          <Select
                            as="select"
                            size="md"
                            maxW={20}
                            value={qty}
                            className="select-product"
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.stock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Select>
                        ) : (
                          <span style={{ display: "flex" }}>
                            <MdDoNotDisturb size="26" /> AGOTADO{" "}
                          </span>
                        )}
                      </ul>
                    </div>
                  </ul>
                </div>

                <div className="purchase-info">
                  <Button
                    onClick={addToCartHandler}
                    type="button"
                    className="btn-shop"
                    disabled={product.stock === 0}
                  >
                    {" "}
                    <AiFillShop size="24" />
                    Agregar al carrito{" "}
                  </Button>
                </div>

                <div className="social-links">
                  <p>Compartir en: </p>
                  <Link className="social" to="#">
                    <i>
                      {" "}
                      <IoLogoFacebook size="20" />
                    </i>
                  </Link>
                  <Link className="social" href="#">
                    <i>
                      <AiFillTwitterCircle size="20" />
                    </i>
                  </Link>
                  <Link className="social" href="#">
                    <i>
                      <AiFillInstagram size="20" />{" "}
                    </i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="REVIEWS">
          <h1>Reviews:</h1>
          <h2>NO EXISTEN REVIEWS PARA ESTE PRODUCTO</h2>
          {/* {product.reviews.length === 0 && <h2>NO REVIEWS</h2>} */}
          <div>
            {/* {product.reviews.map((review) => (
              <div className="review">
                <h4>{review.name}</h4>
                <div className="Ratingreview">
                  <Rating value={3} />
                </div>
                <p className="commentreview">{review.comment}</p>
                <p className="datereview">
                  {review.createdAt.substring(0, 10)}
                </p>
              </div> 
            ))}*/}
            <div className="createreview">
              <h1>Crear una nueva reseña:</h1>
              {errorProductReview && <h2>{errorProductReview}</h2>}
              {userInfo ? (
                <FormControl>
                  <FormLabel>Rating :</FormLabel>
                  <Select onChange={(e) => setrating(e.target.value)}>
                    <option value="1">1 POOR</option>
                    <option value="2">2 FAIR</option>
                    <option value="3">3 GOOD</option>
                    <option value="4">4 VERY GOOD</option>
                    <option value="5">5 EXCELLENT</option>
                  </Select>
                  <FormLabel>Comment :</FormLabel>
                  <Textarea
                    onChange={(e) => setcomment(e.target.value)}
                    placeholder="Leave Comment here :"
                  />
                  <Button colorScheme="blue" onClick={submithanlder}>
                    Enviar
                  </Button>
                </FormControl>
              ) : (
                <>
                  Por favor <Link to="/login">Inicie Sesion</Link> para escribir
                  una reseña.
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Productpage;
