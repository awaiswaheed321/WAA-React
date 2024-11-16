import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const goToDetails = () => {
    navigate("/details/1/John", {
      state: { message: "Hello from Home!" },
    });
  };

  const goToSearch = () => {
    navigate("/search?query=React&category=Router");
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={goToDetails}>Go to Details</button>
      <button onClick={goToSearch}>Go to Search</button>

      <Link
        to={{
          pathname: "/details/2/Jane",
          state: { message: "Navigated via Link!" },
        }}
      >
        Go to Details (Link)
      </Link>
    </div>
  );
}

export default Home;
