import styles from "./OnboardingFooter.module.css";

export default function OnboardingFooter({
  children,
  order = "horizontal",
  ...props
}) {
  return (
    <div
      className={`${styles.container} ${
        order === "vertical" ? styles.vertical : ""
      }`}
      {...props}
    >
      {children}
    </div>
  );
}
