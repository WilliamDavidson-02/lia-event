import Chips from "../Chips/Chips";
import Image from "../Image/Image";
import Input from "../Input/Input";
import Label from "../Label/Label";
import OnboardingRadio from "../OnboardingRadio/OnboardingRadio";
import styles from "./ProfileEdit.module.css";
import onboardingMap from "../../lib/onboardingMap.json";
import OnboardingTextArea from "../OnboardingTextArea/OnboardingTextArea";
import Button from "../Button/Button";

export default function ProfileEdit({ profileType, profileData, closeEdit }) {
  const onboardingQuestions = onboardingMap;
  const areaQuestionCompany = onboardingQuestions.company[1];
  return (
    <div className={styles.container}>
      <h2>Edit</h2>
      <form className={styles.field}>
        <div className={styles.editImage}>
          <Image
            src={profileData.avatar}
            style={{
              aspectRatio: 1 / 1,
              width: "5.3rem",
              borderRadius: "100vmax",
              zIndex: "2",
            }}
          />
          <p>edit image</p>
        </div>
        <Label>
          <Input className={styles.inputField} placeholder="Name" defaultValue={profileData.name}></Input>
        </Label>
        {profileType === "company" && (
          <>
            <Label>
              <Input
                className={styles.inputField}
                placeholder="Website"
                defaultValue={profileData.href}></Input>
            </Label>
            <Label>
              <Input
                className={styles.inputField}
                placeholder="Enter mail"
                defaultValue={profileData.contact}></Input>
            </Label>
            <Label className={styles.container}>
              Fields
              <OnboardingRadio options={areaQuestionCompany.options} selected={profileData.area} />
            </Label>
            <Label>Location</Label>
            <Label>LIA</Label>
            <Chips defaultValue={profileData.keywords} />
            <OnboardingTextArea placeholder="About us.." />
          </>
        )}
        {profileType === "student" && (
          <>
            <Label>
              Education
              <OnboardingRadio options={areaQuestionCompany.options} selected={profileData.area} />
            </Label>
            <Label>
              <Input className={styles.inputField} placeholder={profileData.href}></Input>
            </Label>
            <Label>
              <Input className={styles.inputField} placeholder={profileData.contact || "Enter mail"}></Input>
            </Label>
            <Label>Location</Label>
            <Label>LIA</Label>
            <Chips defaultValue={profileData.keywords} />
            <OnboardingTextArea placeholder="About us.." />
          </>
        )}
        <div className={styles.buttons}>
          <Button variant="secondary" onClick={closeEdit}>
            Cancel
          </Button>
          <Button variant="primary">Save Settings</Button>
        </div>
      </form>
    </div>
  );
}
