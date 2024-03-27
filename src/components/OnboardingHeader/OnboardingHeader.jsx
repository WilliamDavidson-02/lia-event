import React from "react";
import styles from "./OnboardingHeader.module.css";

export default function OnboardingHeader({ children }) {
  return <h1 className={styles.title}>{children}</h1>;
}
