import { createUseStyles } from "react-jss";

export const useSignInStyles = createUseStyles({
  parent: {
    background: "#333333",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  formDiv: {
    width: "300px",
    height: "400px",
    textAlign: "center",
    color: "black",
    background: "white",
    borderRadius: "12px",
  },
  form: {
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    "& span": {
      padding: "10px",
    },
  },
});
