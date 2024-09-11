import React, { useState } from "react";
import ReactDom from "react-dom/client";

import StarRating from "./StarRating";

import App from "./App.js";
import "./index.css";

const root = ReactDom.createRoot(document.getElementById("root"));

function Test() {
  const [movieRating, setMovieRating] = useState(0);

  return (
    <div>
      <StarRating color="blue" onSetRating={setMovieRating} />
      <p>This movie was rated {movieRating} stars</p>
    </div>
  );
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
