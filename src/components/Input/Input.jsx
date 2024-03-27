import React from "react";
import styles from "./Input.module.css";

export default function InputEmail({ type, labelText, placeholderText, ...props }) {
  return (
    <label className={styles.container}>
      <p>{labelText}</p>
      <input className={styles.inputField} type={type} placeholder={placeholderText} {...props} />
    </label>
  );
}
