import React, { cloneElement } from "react";
import styles from "./X.module.css";

function X() {
  return (
    <div className={styles.container}>
      <div>
        <h1>(X)</h1>
      </div>
      <div>
        <p>close</p>
      </div>
    </div>
  );
}

export default X;
