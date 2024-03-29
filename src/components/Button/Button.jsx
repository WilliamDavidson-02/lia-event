import React from "react";
import styles from "./Button.module.css";
import { Loader2 } from "lucide-react";

export default function Button({
  children,
  variant = "primary",
  square = false,
  isLoading = false,
  ...props
}) {
  return (
    <button
      {...props}
      className={`${styles.button} ${styles[variant]} ${
        square ? styles.square : ""
      }`}
    >
      {isLoading ? <Loader2 className={styles.loader} /> : children}
    </button>
  );
}
