import React from "react";
import styles from "./Modal.css";

const modal = props => {
  return <div className={styles.Modal}>{props.children}</div>;
};

export default modal;
