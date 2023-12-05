import { Paper } from "@material-ui/core";
import React from "react";

const CustomPaper = ({ children, variant, className }) => {
  return (
    <>
      <div>
        <Paper
          variant={variant && "outlined"}
          elevation={0}
          className={className}
        >
          {children}
        </Paper>
      </div>
    </>
  );
};

export default CustomPaper;
