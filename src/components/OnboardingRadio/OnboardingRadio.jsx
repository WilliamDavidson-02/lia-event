import styles from "./OnboardingRadio.module.css";
import Input from "../Input/Input";
import Label from "../Label/Label";

export default function OnboardingRadio({
  handleProperty,
  options,
  selected = "",
}) {
  return (
    <div className={styles.container}>
      {options.map((option, i) => (
        <div className={styles.item} key={option.value}>
          <Input
            tabIndex={i + 1}
            id={option.value}
            variant={"radio"}
            type={"radio"}
            value={option.value}
            checked={option.value === selected}
            onChange={() => handleProperty(option.value)}
          />
          <Label htmlFor={option.value}>{option.title}</Label>
        </div>
      ))}
    </div>
  );
}
