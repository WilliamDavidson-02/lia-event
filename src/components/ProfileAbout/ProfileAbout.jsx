import React from "react";
import Tab from "../Tab/Tab";
import Tabs from "../Tabs/Tabs";
import styles from "./ProfileAbout.module.css";
import Chips from "../Chips/Chips";
import { areaTitle, areaValue } from "../../lib/areaData";

export default function ProfileAbout({ profileType, profileData }) {
  const area = profileData?.area;

  const getAreaTitle = (value) => {
    return areaTitle[value];
  };

  const renderAreas = (areas) => {
    if (areas.length === 1) {
      // If only one area Title is selected
      const title = getAreaTitle(areas[0]);
      return <p key={areas[0]}>Field: {title}</p>;
    } else if (areas.length > 1) {
      // IF "all" separate the titles with "/"
      const titles = areas.map((area) => getAreaTitle(area));
      const joinedTitles = titles.join(" / ");
      return <p>Fields: {joinedTitles}</p>;
    } else {
      return null;
    }
  };

  return (
    <div className={styles.container}>
      {profileType === "company" && (
        <Tabs style={{ height: "48.125rem" }}>
          <Tab>
            <h3>About Us</h3>
            {area && renderAreas(areaValue[area])}
          </Tab>
          <Tab>
            <h3>What We&apos;re Looking For</h3>
            <Chips defaultValue={profileData.keywords} />
            <p>Fri text</p>
          </Tab>
          <Tab>
            <h3>Contact</h3>
            <p>Mail: {profileData.company_profile.contact}</p>
          </Tab>
        </Tabs>
      )}

      {profileType === "student" && (
        <Tabs style={{ height: "48.125rem" }}>
          <Tab>
            <h3>About Me</h3>
            <p>
              Field:{" "}
              {profileData.profile.area.map((areaTitle, index) => (
                <React.Fragment key={index}>
                  {areaTitle}
                  {/* If a company has both web devs and design, adds both separated by a forward slash */}
                  {index !== profileData.profile.area.length - 1 && "/"}
                </React.Fragment>
              ))}
            </p>
            <p>Location:</p>
          </Tab>
          <Tab>
            <h3>My Skills</h3>
            <Chips defaultValue={profileData.profile.keywords} />
            <p>Dev/ Design</p>
            <p>Fri text</p>
          </Tab>
          <Tab>
            <h3>Kontakt</h3>
            <p>Mail: {profileData.contact}</p>
          </Tab>
        </Tabs>
      )}
    </div>
  );
}
