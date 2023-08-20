import React, { useState } from "react";
import { Input } from "@chakra-ui/react";
import { useDispatch } from "react-redux"; // Importa useDispatch
import { searchProducts } from "../actions/productActions"; // Importa la acción searchProducts

const Search = ({ history }) => {
  const [keyword, setkeyword] = useState("");
  const dispatch = useDispatch(); // Obtiene la función dispatch

  const Handlesearch = (e) => {
    if (keyword.trim() && e.which === 13) {
      dispatch(searchProducts(keyword)); // Despacha la acción searchProducts
      history.push(`/search/${keyword}`);
    }
  };

  return (
    <div className="Searcharea">
      <Input
        size="lg"
        value={keyword}
        onChange={(e) => setkeyword(e.target.value)}
        onKeyPress={Handlesearch}
        bgColor="white"
        placeholder="Buscar"
      />
    </div>
  );
};

export default Search;
