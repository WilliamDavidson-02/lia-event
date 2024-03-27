import React from "react";
import styles from "./Button.module.css";

export default function Button({
  children,
  variant = "primary",
  square = false,
  ...props
}) {
  return (
    <button
      {...props}
      className={`${styles.button} ${styles[variant]} ${
        square ? styles.square : ""
      }`}
    >
      {children}
    </button>
  );
}
