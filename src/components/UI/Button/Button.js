import React from "react";
import styles from "./Button.css";

const button = props => {
  return (
    <button
      className={[styles.Button, styles[props.btntype]].join(" ")}
      onClick={props.clicked}
      {...props}
    >
      {props.children}
    </button>
  );
};

export default button;
