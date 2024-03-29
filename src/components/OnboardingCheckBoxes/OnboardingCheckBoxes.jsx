import styles from "./OnboardingCheckBoxes.module.css";

export default function OnboardingCheckBoxes({
  handleProperty,
  options,
  checkedValues,
}) {
  const checkHandler = (event) => {
    let selections = checkedValues;

    if (selections.includes(event.target.value)) {
      selections = selections.filter(
        (selectedCheck) => selectedCheck !== event.target.value
      );
    } else {
      selections.push(event.target.value);
    }

    handleProperty(selections);
  };
  return (
    <div className={styles.checkboxContainer}>
      {options.map((option) => (
        <label className={styles.label} key={option.value}>
          <input
            className="checkbox"
            type="checkbox"
            value={option.value}
            checked={checkedValues.includes(option.value)}
            onChange={checkHandler}
          />
          <p>{option.title}</p>
        </label>
      ))}
    </div>
  );
}
