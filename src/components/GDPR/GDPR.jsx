import React from "react";
import styles from "./GDPR.module.css";
import GDPRselectField from "../GDPRselectField/GDPRselectField.jsx";
import GDPRconfirm from "../GDPRconfirm/GDPRconfirm.jsx";

export default function GDPR() {
  return (
    <div className={styles.container}>
      <GDPRconfirm />
      <GDPRselectField />
    </div>
  );
}
