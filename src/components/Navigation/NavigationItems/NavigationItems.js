import React from "react";

import NavigationItems from "./NavigationItem/NavigationItem";
import styles from "./NavigationItems.css";

const navigationItems = () => {
  return (
    <ul className={styles.NavigationItems}>
      <NavigationItems link="/" exact>
        Burger Builder
      </NavigationItems>
      <NavigationItems link="/orders">Orders</NavigationItems>
    </ul>
  );
};

export default navigationItems;
