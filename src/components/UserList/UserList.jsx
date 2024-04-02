import { useEffect, useRef } from "react";
import styles from "./UserList.module.css";
import Image from "../Image/Image";

export default function UserList({ users }) {
  const container = useRef(null);

  useEffect(() => {
    if (!container.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove(styles.fade);
          } else {
            entry.target.classList.add(styles.fade);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    container.current.childNodes.forEach((child) => {
      observer.observe(child);
    });

    return () => {
      container.current?.childNodes.forEach((child) => {
        observer.unobserve(child);
      });
    };
  }, [container.current]);

  return (
    <section ref={container} className={styles.content}>
      {users.map((user, i) => (
        <div className={styles.card} key={i}>
          <Image
            src={user.avatar || ""}
            style={{ aspectRatio: 16 / 9, borderRadius: "0.5rem" }}
          />
          <div>
            <div className={styles.title}>{user.profile.name}</div>
            <div className={styles.paragraph}>{user.area.join(" ")}</div>
          </div>
        </div>
      ))}
    </section>
  );
}
