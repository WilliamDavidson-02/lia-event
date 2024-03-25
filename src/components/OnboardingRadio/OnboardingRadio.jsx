import { useState } from "react";
import styles from "./OnboardingRadio.module.css";

export default function OnboardingRadio({ handleProperty, options }) {
  const [selectedOption, setSelectedOption] = useState("");
  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    handleProperty(selectedValue);
  };

  return (
    <div className={styles.radioContainer}>
      {options.map((option) => (
        <label key={option}>
          <input
            className="radioButton"
            type="radio"
            value={option}
            checked={option === selectedOption}
            onChange={handleOptionChange}
          />
          <p>{option}</p>
        </label>
      ))}
    </div>
  );
}
