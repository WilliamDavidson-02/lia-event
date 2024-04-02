import React from "react";
import styles from "./Profile.module.css";
import BusinessCard from "../../components/BusinessCard/BusinessCard";
import ProfileAbout from "../../components/ProfileAbout/ProfileAbout";

export default function Profile() {
  return (
    <div className={styles.container}>
      <BusinessCard name="Hello" url="google.se" profileImg="#" />
      <ProfileAbout sectionHeader="Test" />
    </div>
  );
}
