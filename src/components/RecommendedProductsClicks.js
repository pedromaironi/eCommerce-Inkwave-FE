import React, { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import CardProduct from "./CardProduct";
import { clickRecommendationBasedContent } from "../actions/recommendationActions";
import { Link, Route } from "react-router-dom";
import {
  NumberInput,
  NumberInputField,
  FormLabel,
  Button,
  Stack,
  FormControl,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

const RecommendedProductsClicks = ({ match, history }) => {
  const dispatch = useDispatch();

  //   //* Recommendations List
  const recommendationsBasedContent = useSelector(
    (state) => state.clickRecommendationReducer
  );

  const { loading, error, recommendations } = recommendationsBasedContent;

  useEffect(() => {
    setTimeout(() => {
      dispatch(clickRecommendationBasedContent());
    }, 5000); // Espera 5 segundos antes de ejecutar la acción
  }, [dispatch]);

  return (
    <>
      <div className="Cgfilter">
        <h1>Similares a productos que viste</h1>
      </div>

      {loading ? (
        <div className="loadingR">
          <HashLoader color={"#fff"} loading={loading} size={40} />
          <p>Cargando productos...</p>
        </div>
      ) : error ? (
        <h2>{error}</h2>
      ) : recommendations === undefined ? (
        <div className="loading">
          <HashLoader color={"#fff"} loading={loading} size={40} />
        </div>
      ) : recommendations && recommendations.length === 0 ? (
        <h1 className="nothingfound">
          Realiza mas acciones dentro de nuestra pagina para recibir
          recomendaciones
        </h1>
      ) : (
        <div className="cardsProduct">
          {recommendations.map((recommendations) => (
            <CardProduct key={recommendations.id} product={recommendations} />
            // <span key={product.id}> {product} </span>
          ))}
        </div>
      )}
    </>
  );
};

export default RecommendedProductsClicks;
