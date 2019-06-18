import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import styles from "./BuildControls.css";

const buildControls = props => {
  let controls = [
    { label: "Salad", type: "salad" },
    { label: "Cheese", type: "cheese" },
    { label: "Bacon", type: "bacon" },
    { label: "Meat", type: "meat" }
  ];
  return (
    <div className={styles.BuildControls}>
      <p>
        Current Price : <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map(ctrl => {
        return (
          <BuildControl
            key={ctrl.label}
            label={ctrl.label}
            added={() => {
              props.ingredientAdded(ctrl.type);
            }}
            removed={() => {
              props.ingredientRemoved(ctrl.type);
            }}
            disabled={props.disabled[ctrl.type]}
          />
        );
      })}
      <button disabled={!props.purchaseStatus} className={styles.OrderButton}>
        ORDER NOW
      </button>
    </div>
  );
};

export default buildControls;