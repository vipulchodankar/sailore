import React, { FC } from "react";

// Mui
import Button from "@material-ui/core/Button";

const HomePage: FC = () => {
  return (
    <div>
      Home Page{" "}
      <Button variant="contained" color="primary">
        Button
      </Button>
      <Button variant="contained" color="secondary">
        Button
      </Button>
    </div>
  );
};

export default HomePage;
