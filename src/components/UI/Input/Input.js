import React from "react";
import ReactSelect from "react-select";

import styles from "./Input.css";

const input = props => {
  let InputElement = null;
  switch (props.inputtype) {
    case "input":
      InputElement = <input className={styles.InputElement} {...props} />;
      break;
    case "textarea":
      InputElement = <textarea className={styles.InputElement} {...props} />;
      break;
    case "select":
      InputElement = <ReactSelect className={styles.InputElement} {...props} />;
      break;
    default:
      InputElement = <input className={styles.InputElement} {...props} />;
      break;
  }
  return (
    <div className={styles.Input}>
      <label className={styles.Label}>{props.label}</label>
      {InputElement}
    </div>
  );
};

export default input;
