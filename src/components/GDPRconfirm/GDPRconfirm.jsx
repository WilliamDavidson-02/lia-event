import React from "react";
import styles from "../GDPRconfirm/GDPRconfirm.module.css";

export default function GDPRconfirm() {
  return (
    <div className={styles.container}>
      <img alt="GDPR-logo" />
      <h3>GDPR</h3>
      <p>Vi informerar dig om vår hantering av personuppgifter enligt GDPR (artikel 13)</p>
      <p>Läs mer --</p>
    </div>
  );
}
