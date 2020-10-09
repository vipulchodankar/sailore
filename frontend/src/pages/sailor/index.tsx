import React, { FC, useState, useEffect } from "react";
import axios from "../../services/axios";

// Custom Components
import Loader from "../../components/Loader";

const SailorPage: FC = () => {
  // const [sailors, setSailors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(function loadSailors() {
    setLoading(true);
    axios
      .get("/sailor")
      .then((data) => {
        console.log("====================================");
        console.log(data);
        console.log("====================================");
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      All Sailor Page
      {loading ? <Loader /> : null}
    </div>
  );
};

export default SailorPage;
