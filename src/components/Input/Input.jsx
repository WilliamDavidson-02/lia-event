import styles from "./Input.module.css";

export default function Input({
  variant = "default",
  isError = false,
  ...props
}) {
  return (
    <input
      className={`${styles[variant]} ${isError ? styles.error : ""}`}
      {...props}
    />
  );
}
