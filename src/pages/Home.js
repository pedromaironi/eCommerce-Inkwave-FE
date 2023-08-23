import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import Slider from "../components/Slider";
import Cardscg from "../components/Cardscg";
import CgDiv from "../components/CgDiv";
import ProductsC from "../components/ProductsC";
import RecommendedProducts from "../components/RecommendedProducts";
import RecommendedProductsClicks from "../components/RecommendedProductsClicks";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import GlobalStateViewer from "../components/GlobalStateViewer";

const Home = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <>
      <GlobalStateViewer />
      <Helmet>
        <title>Inkwave</title>
      </Helmet>
      <div>
        <Slider />
        <div className="cards">
          <Cardscg title="Mujeres" />
          <Cardscg title="Hombres" />
          <Cardscg title="Accesorios" />
        </div>
        {userInfo && (
          <>
            <RecommendedProducts />
            <RecommendedProductsClicks />
          </>
        )}
        <CgDiv />
        <ProductsC />
      </div>
    </>
  );
};

export default Home;
