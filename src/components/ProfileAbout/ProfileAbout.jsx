import React from "react";
import Tab from "../Tab/Tab";
import Tabs from "../Tabs/Tabs";
import styles from "./ProfileAbout.module.css";
import Chips from "../Chips/Chips";

export default function ProfileAbout({ userType, userData }) {
  return (
    <div className={styles.container}>
      {userType === "company" && (
        <Tabs style={{ height: "48.125rem" }}>
          <Tab>
            <h3>About Us</h3>
            <p>
              Field:{" "}
              {userData.profile.area.map((areaTitle, index) => (
                <React.Fragment key={index}>
                  {areaTitle}
                  {/* If a company has both web devs and design, adds both separated by a forward slash */}
                  {index !== userData.profile.area.length - 1 && "/"}
                </React.Fragment>
              ))}
            </p>
          </Tab>
          <Tab>
            <h3>What We're Looking For</h3>
            <Chips defaultValue={userData.profile.keywords} />
            <p>Fri text</p>
          </Tab>
          <Tab>
            <h3>Contact</h3>
            <p>Mail: {userData.contact}</p>
          </Tab>
        </Tabs>
      )}

      {userType === "student" && (
        <Tabs style={{ height: "48.125rem" }}>
          <Tab>
            <h3>About Me</h3>
            <p>
              Field:{" "}
              {userData.profile.area.map((areaTitle, index) => (
                <React.Fragment key={index}>
                  {areaTitle}
                  {/* If a company has both web devs and design, adds both separated by a forward slash */}
                  {index !== userData.profile.area.length - 1 && "/"}
                </React.Fragment>
              ))}
            </p>
            <p>Location:</p>
          </Tab>
          <Tab>
            <h3>My Skills</h3>
            <Chips defaultValue={userData.profile.keywords} />
            <p>Dev/ Design</p>
            <p>Fri text</p>
          </Tab>
          <Tab>
            <h3>Kontakt</h3>
            <p>Mail: {userData.contact}</p>
          </Tab>
        </Tabs>
      )}
    </div>
  );
}
