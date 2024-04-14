import { useParams } from "react-router-dom";
import styles from "./ProfileAbout.module.css";

export default function ProfileAbout({ profile }) {
  const { profileType } = useParams();

  return <div className={styles.container}></div>;
}
