import { useState } from "react";
import styles from "./OnboardingRadio.module.css";

export default function OnboardingRadio({
  handleProperty,
  options,
  selectedValue = "",
}) {
  return (
    <div className={styles.radioContainer}>
      {options.map((option) => (
        <label className={styles.label} key={option}>
          <input
            className="radioButton"
            type="radio"
            value={option}
            checked={option === selectedValue}
            onChange={(event) => handleProperty(event.target.value)}
          />
          <p>{option}</p>
        </label>
      ))}
    </div>
  );
}
