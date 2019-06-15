import React from "react";
import styles from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
const _ = require("lodash");
const burger = props => {
  let Staffing = Object.keys(props.ingredients)
    .map(ingredientKey => {
      return [...Array(props.ingredients[ingredientKey])].map((_, i) => {
        return (
          <BurgerIngredient key={ingredientKey + i} type={ingredientKey} />
        );
      });
    })
    .reduce((arr, elem) => {
      return arr.concat(elem);
    });
  if (Staffing.length === 0) {
    Staffing = <p>Please add Ingredients!!!</p>;
  }
  return (
    <div className={styles.Burger}>
      <BurgerIngredient type="bread-top" />
      {Staffing}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
