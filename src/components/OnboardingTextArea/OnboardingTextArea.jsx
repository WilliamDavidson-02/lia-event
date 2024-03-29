import styles from "./OnboardingTextArea.module.css";

export default function OnboardingTextArea({
  handleSubmit,
  handleProperty,
  propertyValue = "",
}) {
  const handleKeyDown = (ev) => {
    if (ev.key === "Enter" && !ev.shiftKey) handleSubmit(ev);
  };

  return (
    <textarea
      className={styles.textarea}
      value={propertyValue}
      onChange={(ev) => handleProperty(ev.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Type ..."
    ></textarea>
  );
}
