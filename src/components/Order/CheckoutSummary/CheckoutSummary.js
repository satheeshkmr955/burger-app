import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import styles from "./CheckoutSummary.css";

const checkoutSummary = props => {
  return (
    <div className={styles.checkoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients}></Burger>
      </div>
      <Button btnType="Danger" clicked={props.checkoutCancel}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.checkoutContinue}>
        CONTINUE
      </Button>
    </div>
  );
};
export default checkoutSummary;
