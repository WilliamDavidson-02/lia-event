import styles from "./OnboardingRadio.module.css";

export default function OnboardingRadio({
  handleProperty,
  options,
  selectedValue = "",
}) {
  return (
    <div className={styles.radioContainer}>
      {options.map((option) => (
        <label className={styles.label} key={option.value}>
          <input
            className="radioButton"
            type="radio"
            value={option.value}
            checked={option.value === selectedValue}
            onChange={(event) => handleProperty(event.target.value)}
          />
          <p>{option.title}</p>
        </label>
      ))}
    </div>
  );
}
