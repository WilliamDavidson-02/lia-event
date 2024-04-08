import { HeartHandshake, Star } from "lucide-react";
import styles from "./MatchRating.module.css";

export default function MatchRating({ rating, show, ...props }) {
  return (
    <div className={styles.container} {...props}>
      <div className={styles.trigger}>
        <HeartHandshake size={24} />
      </div>
      <div className={styles.track}>
        <div className={`${styles.stars} ${show ? styles.show : ""}`}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              size={16}
              fill={index < rating ? "white" : "transparent"}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
