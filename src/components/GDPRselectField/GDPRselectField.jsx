import React from "react";
import styles from "./GDPRselectField.module.css";

export default function GDPRselectField() {
  return (
    <div className={styles.container}>
      {/* Select divs need to link to Student and Business log in! */}
      <div className={styles.select}>
        <h3>Student</h3>
      </div>
      <div className={styles.select}>
        <h3>Företag</h3>
      </div>
    </div>
  );
}
