import React from "react";
import { useParams, useLocation } from "react-router-dom";

function Details() {
  const { id, name } = useParams();
  const location = useLocation();

  return (
    <div>
      <h1>Details Page</h1>
      <p>ID: {id}</p>
      <p>Name: {name}</p>
      <p>State Message: {location.state?.message || "No state provided"}</p>
    </div>
  );
}

export default Details;
