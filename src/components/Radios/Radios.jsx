import styles from "./Radios.module.css";
import Input from "../Input/Input";
import Label from "../Label/Label";

export default function Radios({
  handleProperty,
  options,
  selected = "",
  variantInput = "radio",
  variant = "onboarding",
}) {
  return (
    <div className={styles.container}>
      {options.map((option, i) => (
        <div className={`${styles.item} ${styles[variant]}`} key={option.value}>
          <Input
            tabIndex={i + 1}
            id={option.value}
            variant={variantInput}
            type={"radio"}
            value={option.value}
            checked={option.value === selected}
            onChange={() => handleProperty(option.value)}
          />
          <Label
            style={{ flexGrow: "1", cursor: "pointer" }}
            htmlFor={option.value}
          >
            {option.title}
          </Label>
        </div>
      ))}
    </div>
  );
}
