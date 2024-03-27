import { useState } from "react";
import styles from "./OnboardingCheckBoxes.module.css";

export default function OnboardingCheckBoxes({ options }) {
  const [selectedChecks, setSelectedChecks] = useState([]);

  const checkHandler = (event) => {
    let selection = selectedChecks;

    if (selectedChecks.includes(event.target.value)) {
      selection = selection.filter(
        (selectedCheck) => selectedCheck !== event.target.value
      );
    } else {
      selection.push(event.target.value);
    }

    setSelectedChecks(selection);
  };
  return (
    <div className={styles.checkboxContainer}>
      {options.map((option) => (
        <label className={styles.label} key={option}>
          <input
            className="checkbox"
            type="checkbox"
            value={option}
            onClick={checkHandler}
          />
          <p>{option}</p>
        </label>
      ))}
    </div>
  );
}
