import Image from "../Image/Image";
import styles from "./UserPreview.module.css";

export default function UserPreview({ user, ...props }) {
  return (
    <div className={styles.card} {...props}>
      <Image
        src={user.avatar}
        style={{ aspectRatio: 16 / 9, borderRadius: "0.5rem" }}
      />
      <div>
        <div className={styles.title}>{user.name}</div>
        <div className={styles.paragraph}>{user.area.join(" ")}</div>
      </div>
    </div>
  );
}
