import styles from "./Textarea.module.css";

export default function Textarea({
  handleSubmit,
  handleProperty,
  propertyValue = "",
  ...props
}) {
  const handleKeyDown = (ev) => {
    if (ev.key === "Enter" && !ev.shiftKey) handleSubmit(ev);
  };

  return (
    <textarea
      {...props}
      className={styles.textarea}
      value={propertyValue}
      onChange={(ev) => handleProperty(ev.target.value)}
      onKeyDown={handleKeyDown}
    ></textarea>
  );
}
