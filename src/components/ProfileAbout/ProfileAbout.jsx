import Tab from "../Tab/Tab";
import Tabs from "../Tabs/Tabs";
import styles from "./ProfileAbout.module.css";

export default function ProfileAbout({ sectionHeader }) {
  return (
    <div className={styles.container}>
      <Tabs style={{ height: "48.125rem" }}>
        <Tab>
          <h3>Om oss</h3>
          <p>Branchroll</p>
          <p>Antal Anställda:</p>
          <p>Onsite/ Remote/ Hybrid</p>
        </Tab>
        <Tab>
          <h3>{sectionHeader}</h3>
        </Tab>
        <Tab>
          <h3>{sectionHeader}</h3>
        </Tab>
      </Tabs>
    </div>
  );
}
