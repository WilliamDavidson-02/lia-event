import styles from "./BusinessCard.module.css";
import { UserRoundCog } from "lucide-react";
import { Heart } from "lucide-react";

export default function BusinessCard({ name, url }) {
  return (
    <div className={styles.container}>
      <div className={styles.images}>
        {/* profileImg here */}
        <div className={styles.placeholderCircle}></div>
        {/* roundCog on logged in as business, heart as student 
        Cog should redirect to "edit profile" while Heart adds current company to students favourites list*/}
        <UserRoundCog style={{ display: "none" }} />
        <Heart style={{ display: "block" }} />
      </div>
      <h3>{name}</h3>
      <a href={url} target="_blank" className={styles.readMore}>
        <p>{url}</p>
      </a>
    </div>
  );
}
