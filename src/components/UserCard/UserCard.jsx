import styles from "./UserCard.module.css";
import Image from "../Image/Image";
import { Heart } from "lucide-react";

export default function UserCard({ user, children, ...props }) {
  return (
    <div {...props} className={styles.card}>
      <Heart style={{ marginLeft: "auto" }} />
      <div className={styles.content}>
        <Image
          src={user.avatar}
          style={{
            aspectRatio: 1 / 1,
            width: "5.3rem",
            borderRadius: "100vmax",
            zIndex: "2",
          }}
        />
        <div>
          <div className={styles.title}>{user.profile.name}</div>
          <div className={styles.paragraph}>{user.href}</div>
        </div>
      </div>
      {children}
    </div>
  );
}
