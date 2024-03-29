import styles from "./OnboardingCard.module.css";

function OnboardingCard({ children }) {
  return <div className={styles.container}>{children}</div>;
}

export default OnboardingCard;
