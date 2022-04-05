import React from "react";
import { Link } from "react-router-dom";

function Main() {
  return (
    <div>
      <h1>main</h1>
      <button>
        <Link to="/survey/Survey.js">survey</Link>
      </button>
    </div>
  );
}

export default Main;
