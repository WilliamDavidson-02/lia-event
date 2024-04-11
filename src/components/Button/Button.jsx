import styles from "./Button.module.css";
import { Loader2 } from "lucide-react";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  square = false,
  isLoading = false,
  ...props
}) {
  return (
    <button
      {...props}
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${
        square ? styles.square : ""
      }`}
    >
      {isLoading ? <Loader2 className="loader" /> : children}
    </button>
  );
}
