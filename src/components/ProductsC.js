import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardProduct from "./CardProduct";
import { searchProducts } from "../actions/productActions"; // Importa la acción adecuada
import {
  listProducts,
  ListproductbyCg,
  Listproductbyfiter,
  Listproductbyprice,
} from "../actions/productActions";
import { listCategories } from "../actions/categoryActions";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFilter } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import {
  NumberInput,
  NumberInputField,
  FormLabel,
  Button,
  Stack,
  FormControl,
  Input,
} from "@chakra-ui/react";
import HashLoader from "react-spinners/HashLoader";
import { Link, Route } from "react-router-dom";
import { PRODUCT_SEARCH_RESET } from "../constants/productConstants";
const ProductsC = ({ match, history }) => {
  const [From, setFrom] = useState(0);
  const [keywords, setkeywords] = useState("");

  const [To, setTo] = useState(0);

  let Cg = window.location.search ? window.location.search.split("=")[1] : null;
  const keyword = window.location.pathname.split("/")[2];

  const dispatch = useDispatch();

  //* Product List
  const productList = useSelector((state) => state.productList);

  //* Product Search List
  const productSearchList = useSelector(
    (state) => state.productSearchReducer.products
  );

  //* Product by Category
  const productbycg = useSelector((state) => {
    return state.ListproductbyCg;
  });

  //* Product by Filter
  const productbyfilter = useSelector((state) => {
    return state.Listproductbyfilter;
  });

  //* Product by Price
  const productbyprice = useSelector((state) => {
    return state.Listproductbyprice;
  });

  //* Categories
  const categoryList = useSelector((state) => {
    return state.categoryList;
  });

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  const Handlesearch = (e) => {
    if (keywords.trim() && e.which === 13) {
      dispatch(searchProducts(keywords)); // Despacha la acción searchProducts
    }
  };

  const { loading, error, products } = productbycg
    ? productbycg
    : productList
    ? productList
    : productbyprice;

  useEffect(() => {
    if (Cg) {
      console.log(window.location.search.split("=")[0]);
      if (window.location.search.split("=")[0] === "?cg") {
        dispatch(ListproductbyCg(Cg));
      } else {
        dispatch(Listproductbyfiter(Cg));
      }
    } else {
      dispatch(listProducts(keyword));
    }
  }, [dispatch, Cg, keyword]);

  useEffect(() => {
    if (productSearchList.length > 0 && !keywords) {
      dispatch({ type: PRODUCT_SEARCH_RESET });
    }
  }, [productSearchList, history, keywords, dispatch]);

  const [showfilter, setshowfilter] = useState(false);
  const [showsearch, setshowsearch] = useState(false);

  const filterfunc = () => {
    setshowfilter(!showfilter);
    if (showsearch) {
      setshowsearch(false);
    }
  };
  const searchfunc = () => {
    setshowsearch(!showsearch);
    if (showfilter) {
      setshowfilter(false);
    }
  };
  const pricehandler = () => {
    dispatch(Listproductbyprice(From, To));
  };

  return (
    <>
      <div className="Cgfilter">
        <h1>
          {Cg ? Cg + " | " : keyword ? "*" + keyword + "* Search" : "Lista de "}{" "}
          Productos
        </h1>
        <div className="filtersbtn ">
          <button
            className={`searchbtn ${showsearch ? "activebtn" : ""}`}
            onClick={searchfunc}
          >
            {showsearch ? (
              <IoMdClose size="20" />
            ) : (
              <AiOutlineSearch size="20" />
            )}
            Buscar
          </button>
        </div>

        <div className="filters">
          <ul>
            {/* Mostrar las categorías */}
            {categoryList && categoryList.loading ? (
              <p>Loading...</p>
            ) : categoryList && categoryList.error ? (
              <p>Error: {categoryList.error}</p>
            ) : categoryList && categoryList.categories ? (
              categoryList.categories.map((category) => (
                <Link
                  key={category.id}
                  className="lined"
                  to={`/?cg=${category.nombre}`}
                >
                  {category.nombre}
                </Link>
              ))
            ) : null}
          </ul>
        </div>
      </div>
      {showsearch && (
        <Route
          render={({ history }) => (
            <div className="Searcharea">
              <Input
                size="lg"
                value={keywords}
                onChange={(e) => setkeywords(e.target.value)}
                onKeyPress={Handlesearch}
                bgColor="white"
                placeholder="Buscar"
              />
            </div>
          )}
        />
      )}
      {loading ? (
        <div className="loading">
          <HashLoader color={"#fff"} loading={loading} size={40} />
        </div>
      ) : error ? (
        <h2>{error}</h2>
      ) : products && products.length === 0 ? (
        <h1 className="nothingfound">
          No existen productos en esta categoría.
        </h1>
      ) : (
        <div className="cardsProduct">
          {productSearchList.length > 0
            ? productSearchList.map((product) => (
                <CardProduct key={product.id} product={product} />
              ))
            : products.map((product) => (
                <CardProduct key={product.id} product={product} />
              ))}
        </div>
      )}
    </>
  );
};

export default ProductsC;
