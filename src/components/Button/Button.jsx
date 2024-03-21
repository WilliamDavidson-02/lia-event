import React, { cloneElement } from "react";
import styles from "./Button.module.css";

function Button({ children, type }) {
  return <button className={`${styles.button} ${styles[type]}`}>{children}</button>;
}

export default Button;
