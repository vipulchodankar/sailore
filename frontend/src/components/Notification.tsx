import React from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { doHideNotification } from "../redux/actions/ui";
import { selectNotification } from "../redux/selectors/ui";

// Mui
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Notification = () => {
  const dispatch = useDispatch();
  const { isOpen, type, message } = useSelector(selectNotification);

  const handleClose = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(doHideNotification());
  };

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Alert onClose={handleClose} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
