import { createUseStyles } from "react-jss";

export const useProfileStyles = createUseStyles({
  parent: {
    background: "#333333",
  },
  menu: {
    width: "100%",
    minHeight: "100px",
    position: "fixed",
    zIndex: "10",
    background: "#535353",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },

  menuRight: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    "& div": {
      padding: " 0 30px",
    },
  },
  menuLeft: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    "& div": {
      padding: "0 10px",
    },
  },
  descriptionCategory: {
    paddingTop: "120px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
  },
  description: {
    textAlign: "center",
    "& p": {
      width: "380px",
      background: "#C8C4C7",
      marginLeft: "150px",
      borderRadius: "15px",
      transition: "0.6s",
      color: "#2F4F4F",
      boxShadow: "5px 5px 10px grey",
    },
    "& p:hover": {
      boxShadow: "20px 20px 50px grey",
      transform: "scale(1.1)",
    },
  },
  categories: {
    textAlign: "center",
  },
  myCategories: {
    color: "#04AA6D",
    letterSpacing: "3px",
  },
  deleteCategoryTask: {
    background: "#333333",
    color: "red",
    border: "none",
  },
  myTasks: {
    marginTop: 80,
    textAlign: "center",
    color: "#04AA6D",
    letterSpacing: "3px",
    "& span": {
      transition: "0.5s",
    },
  },
  task: {
    margin: "auto",
    marginTop: 50,
    maxWidth: "80%",
    backgroundImage: "linear-gradient(to right, orange , black)",
    textAlign: "center",
    color: "white",
    display: "grid",
    gridTemplateColumns: "2fr 5fr 1fr",
  },
  commentsResponses: {
    margin: "auto",
    marginTop: 10,
    maxWidth: "80%",
    textAlign: "center",
    color: "white",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
  },
  comments: {
    maxHeight: 220,
    overflow: "hidden",
    overflowY: "scroll",
    padding: 20,
  },
  commentValue: {
    marginTop: "30px",
    borderRadius: "10px",
    background: "#875700FF",
    padding: "10px 50px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  responseValue: {
    marginTop: "30px",
    borderRadius: "10px",
    background: "#875700FF",
    padding: "10px 50px",
  },
  responses: {
    maxHeight: 220,
    overflow: "hidden",
    overflowY: "scroll",
    padding: 20,
  },
});
