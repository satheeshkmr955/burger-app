import React from "react";
import styles from "./NavigationItems.css";
import NavigationItems from "./NavigationItem/NavigationItem";

const navigationItems = () => {
  return (
    <ul className={styles.NavigationItems}>
      <NavigationItems link="/" active>
        Burger Builder
      </NavigationItems>
      <NavigationItems link="/">Checkout</NavigationItems>
    </ul>
  );
};

export default navigationItems;
