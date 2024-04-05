import styles from "./OnboardingCheckBoxes.module.css";
import Input from "../Input/Input";
import Label from "../Label/Label";

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
    <div className={styles.container}>
      {options.map((option, i) => (
        <div className={styles.item} key={option.value}>
          <Input
            tabIndex={i + 1}
            id={option.value}
            variant={"checkbox"}
            type={"checkbox"}
            value={option.value}
            onChange={checkHandler}
          />
          <Label htmlFor={option.value}>{option.title}</Label>
        </div>
      ))}
    </div>
  );
}
