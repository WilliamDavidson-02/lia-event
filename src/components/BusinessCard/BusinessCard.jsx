import React, { useState } from "react";
import styles from "./BusinessCard.module.css";
import { UserRoundCog } from "lucide-react";
import { Heart } from "lucide-react";

export default function BusinessCard({ name, url, profileImg }) {
  return (
    <div className={styles.container}>
      <div className={styles.images}>
        {/* profileImg here */}
        <div className={styles.placeholderCircle}></div>
        {/* roundCog on logged in as business, heart as student */}
        <UserRoundCog style={{ display: "block" }} />
        <Heart style={{ display: "none" }} />
      </div>
      <h3>{name}</h3>
      <a href={url} target="_blank" className={styles.readMore}>
        <p>{url}</p>
      </a>
    </div>
  );
}
