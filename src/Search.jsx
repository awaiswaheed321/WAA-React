import React from "react";
import { useSearchParams } from "react-router-dom";

function Search() {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query");
  const category = searchParams.get("category");

  return (
    <div>
      <h1>Search Page</h1>
      <p>Query: {query}</p>
      <p>Category: {category}</p>
    </div>
  );
}

export default Search;
