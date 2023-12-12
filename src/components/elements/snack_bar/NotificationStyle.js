import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(10),
    },
  },
  BackGroundSucces: {
    width: "100%",
    background: "#55c5d1 !important",
    marginTop: theme.spacing(5),
    position: "relative",
  },
  BackGroundfailed: {
    width: "100%",
    backgroundColor: "#ce0000",
    marginTop: theme.spacing(6),
    position: "relative",
  },
}));
