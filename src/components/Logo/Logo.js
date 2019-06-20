import React from "react";
import burgerLogo from "../../assets/images/26.1 burger-logo.png";
import styles from "./Logo.css";
const logo = props => (
  <div className={styles.Logo} style={{ height: props.height }}>
    <img src={burgerLogo} alt="MyBurger" />
  </div>
);

export default logo;
