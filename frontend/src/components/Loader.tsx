import React from "react";

// Mui
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";

const Loader = (props: any) => {
  const { fullscreen } = props;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height={fullscreen ? "100vh" : "100%"}
    >
      <CircularProgress />
    </Box>
  );
};

Loader.defaultProps = {
  fullscreen: false,
};

export default Loader;
