import React, { FC, Fragment } from "react";
import { useHistory } from "react-router-dom";

// Mui
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  landing: {
    background:
      "linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)), url('https://source.unsplash.com/1600x900/?sailor')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
}));

const HomePage: FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = () => {
    history.push("/sailor");
  };

  return (
    <Fragment>
      <Box
        width="100%"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        className={classes.landing}
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleClick}
        >
          View all sailors
        </Button>
      </Box>
    </Fragment>
  );
};

export default HomePage;
