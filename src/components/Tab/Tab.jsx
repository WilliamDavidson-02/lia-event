import styles from "../../components/Tab/Tab.module.css";

export default function Tab({ children, ...props }) {
  return (
    <div {...props} className={styles.container}>
      {children}
    </div>
  );
}
