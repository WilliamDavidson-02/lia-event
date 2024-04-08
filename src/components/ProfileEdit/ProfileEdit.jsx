import Chips from "../Chips/Chips";
import Image from "../Image/Image";
import styles from "./ProfileEdit.module.css";

export default function ProfileEdit(profile, profileData, children, ...props) {
  return (
    <div>
      <h1>Edit</h1>
      <form>
        <Image
          src={profile.avatar}
          style={{
            aspectRatio: 1 / 1,
            width: "5.3rem",
            borderRadius: "100vmax",
            zIndex: "2",
          }}
        />
        <div className={styles.title}>{profile.name}</div>
        <div className={styles.paragraph}>{profile.href}</div>
        <div className={styles.paragraph}>{profile.contact}</div>
        <p>Field</p>
        <p>Location</p>
        <h3>LIA</h3>
        <p>Position</p>
        <Chips defaultValue={profileData.keywords} />
      </form>
    </div>
  );
}
