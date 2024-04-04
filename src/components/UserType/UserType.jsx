import styles from "./UserType.module.css";

export default function UserType({ title, ...props }) {
  return (
    <div {...props} className={styles.container}>
      <h1>{title}</h1>
    </div>
  );
}
