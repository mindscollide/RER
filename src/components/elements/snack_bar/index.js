import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useStyles } from "./NotificationStyle";
import { useSelector } from "react-redux";
const Message = {
  success: "success",
  error: "error",
  info: "info",
  warning: "warning",
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Notification = ({ hide, show, message, severity, notificationClass }) => {
  const currentLanguage = localStorage.getItem("i18nextLng");
  const state = useSelector((state) => state);
  const classes = useStyles();
  const vertical = "top";
  const horizontal = currentLanguage === "ar" ? "left" : "right";
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    hide({
      flag: false,
      message: "",
    });
  };
  return (
    <>
      {message !== "" ? (
        <div className={classes.root}>
          <Snackbar
            autoHideDuration={3000}
            anchorOrigin={{ vertical, horizontal }}
            open={show}
            onClose={handleClose}
            message={message}
            key={vertical + horizontal}
          >
            <Alert
              onClose={handleClose}
              severity={severity}
              className={notificationClass}
            >
              {message}
            </Alert>
          </Snackbar>
        </div>
      ) : null}
    </>
  );
};
export { Notification, Message };
