import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardProduct from "./CardProduct";
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
import Search from "./Search";
import {
  NumberInput,
  NumberInputField,
  FormLabel,
  Button,
  Stack,
  FormControl,
} from "@chakra-ui/react";
import HashLoader from "react-spinners/HashLoader";
import { Link, Route } from "react-router-dom";
const ProductsC = ({ match, history }) => {
  console.log(useSelector((state) => state));
  const [From, setFrom] = useState(0);

  const [To, setTo] = useState(0);

  let Cg = window.location.search ? window.location.search.split("=")[1] : null;
  const keyword = window.location.pathname.split("/")[2];

  const dispatch = useDispatch();

  //* Product List
  const productList = useSelector((state) => state.productList);

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
  const categories = useSelector((state) => {
    return state.categoryList.categories;
  });

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

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
          {Cg ? Cg : keyword ? "*" + keyword + "* Search" : "Lista de"}{" "}
          Productos
        </h1>
        <div className="filtersbtn ">
          <button
            className={`filterbtn ${showfilter ? "activebtn" : ""}`}
            onClick={filterfunc}
          >
            {" "}
            {showfilter ? <IoMdClose size="20" /> : <BsFilter size="20" />}
            Filtrar
          </button>

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
            {categories.map((category) => (
              <Link
                key={category.id}
                className="lined"
                to={`/?cg=${category.nombre}`}
              >
                {category.nombre}
              </Link>
            ))}
          </ul>
        </div>
      </div>
      {showsearch && (
        <Route render={({ history }) => <Search history={history} />} />
      )}
      <div className={`filterarea ${showfilter ? "filter" : "filteroff"}`}>
        <div className="sortbydiv">
          <h1> Sort By</h1>
          <ul>
            <Link
              onClick={() => setshowfilter(false)}
              className="lined"
              to="?filter"
            >
              Default
            </Link>
            <Link
              onClick={() => setshowfilter(false)}
              className="lined"
              to="?filter=Rating"
            >
              Rating
            </Link>
            <Link
              onClick={() => setshowfilter(false)}
              className="lined"
              to="?filter=date"
            >
              Date
            </Link>
            <Link
              onClick={() => setshowfilter(false)}
              className="lined"
              to="?filter=highprice"
            >
              Low to high price
            </Link>
            <Link
              onClick={() => setshowfilter(false)}
              className="lined"
              to="?filter=lowprice"
            >
              high to low price
            </Link>
          </ul>
        </div>
        <div className="pricediv">
          <h1> Price</h1>
          <FormControl id="email">
            <Stack spacing={2}>
              <FormLabel>From :</FormLabel>
              <NumberInput
                value={From}
                bg="white"
                onChange={(e) => setFrom(e)}
                borderRadius="md"
                borderTopRadius="md"
                borderTopLeftRadius="md"
              >
                <NumberInputField />
              </NumberInput>
              <FormLabel>To :</FormLabel>
              <NumberInput
                value={To}
                bg="white"
                onChange={(e) => setTo(e)}
                borderRadius="md"
                borderTopRadius="md"
                borderTopLeftRadius="md"
              >
                <NumberInputField />
              </NumberInput>
              <Button onClick={pricehandler} type="submit" colorScheme="teal">
                Filter
              </Button>
            </Stack>
          </FormControl>
        </div>
      </div>
      {loading ? (
        <div className="loading">
          <HashLoader color={"#fff"} loading={loading} size={40} />
        </div>
      ) : error ? (
        <h2>{error} </h2>
      ) : products.length === 0 ? (
        <h1 className="nothingfound">Nothing Found !!!</h1>
      ) : (
        <div className="cardsProduct">
          {products.map((product) => (
            <CardProduct key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
};

export default ProductsC;
