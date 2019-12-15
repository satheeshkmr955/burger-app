import React from "react";
import styles from "./Button.css";
import PropTypes from "prop-types";

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

button.propTypes = {
  clicked: PropTypes.func
};

button.defaultProps = {
  clicked: () => {}
};

export default button;
