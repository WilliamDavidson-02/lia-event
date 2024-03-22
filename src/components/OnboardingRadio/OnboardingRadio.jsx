import { useState } from "react";
import styles from "./OnboardingRadio.module.css";

export default function OnboardingRadioArea({ handleSubmit, handleProperty, options }) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    handleProperty(selectedValue);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleSubmit(event);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className={styles.radioContainer}>
        {options.map((option, index) => (
          <label>
            <input
              type="radio"
              value={option}
              checked={selectedOption === "option1"}
              onChange={handleOptionChange}
            />
            <p>{option}</p>
          </label>
        ))}
      </div>
    </form>
  );
}
