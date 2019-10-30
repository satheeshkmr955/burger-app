import React from "react";

import styles from "./Order.css";

const order = props => {
  const ingredients = [];
  for (const key in props.ingredients) {
    ingredients.push({ name: key, amount: props.ingredients[key] });
  }
  const ingredientsOutText = ingredients.map(obj => (
    <span className={styles.Span} key={obj.name}>
      {obj.name} ({obj.amount})
    </span>
  ));
  return (
    <div className={styles.Order}>
      <p>Ingredient: {ingredientsOutText}</p>
      <p>
        Price: <strong>USD {parseFloat(props.price).toFixed(2)} </strong>
      </p>
    </div>
  );
};

export default order;
