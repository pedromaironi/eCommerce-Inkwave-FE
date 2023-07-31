import React from "react";
import HashLoader from "react-spinners/HashLoader";
import { Link, Route } from "react-router-dom";
import {
  NumberInput,
  NumberInputField,
  FormLabel,
  Button,
  Stack,
  FormControl,
} from "@chakra-ui/react";

const RecommendedProducts = ({ match, history }) => {
  return (
    <>
      <div className="Cgfilter">
        <h1>Productos Recomendados</h1>
      </div>
    </>
  );
};

export default RecommendedProducts;
