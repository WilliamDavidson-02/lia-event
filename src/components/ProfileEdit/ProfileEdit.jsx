import supabase from "../../config/supabaseConfig";
import Chips from "../Chips/Chips";
import Image from "../Image/Image";
import Input from "../Input/Input";
import Label from "../Label/Label";
import OnboardingRadio from "../OnboardingRadio/OnboardingRadio";
import styles from "./ProfileEdit.module.css";
import onboardingMap from "../../lib/onboardingMap.json";
import OnboardingTextArea from "../OnboardingTextArea/OnboardingTextArea";
import Button from "../Button/Button";
import { useState } from "react";

export default function ProfileEdit({ profileType, profileData, closeEdit }) {
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState(profileData.avatar);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);

    const imagePreview = new FileReader();
    imagePreview.onload = (event) => {
      setImageURL(event.target.result);
    };
    imagePreview.readAsDataURL(file);
  };

  const handleImageUpload = async (event) => {
    event.preventDefault();
    if (!imageFile) return;

    /* get unix time to use as ID to append to uploaded files */
    let timestampID = Math.floor(new Date().getTime() / 1000);

    const avatarFileName = `${timestampID}.${imageFile.name}`;
    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(`public/${avatarFileName}`, imageFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Error uploading image", error.message);
      return;
    }

    /* Get the Base URL to supabase avatars bucket */
    const avatarPrefix = "http://127.0.0.1:54321/storage/v1/object/public/avatars/public";

    let avatarURL = `${avatarPrefix}/${avatarFileName}`;

    const { data: userData, error: userError } = await supabase
      .from("profile")
      .update({ avatar: avatarURL })
      .eq("id", profileData.id);

    if (userError) {
      console.error("Error updating user avatar", userError.message);
      return;
    }

    setImageURL(avatarURL);
  };

  const onboardingQuestions = onboardingMap;
  const areaQuestionCompany = onboardingQuestions.company[1];

  return (
    <div className={styles.container}>
      <h2>Edit</h2>
      <form className={styles.field} autoComplete="off" autoCorrect="off">
        <div className={styles.editImage}>
          <Image
            src={imageURL}
            alt="ProfileImage"
            style={{
              aspectRatio: 1 / 1,
              width: "5.3rem",
              borderRadius: "100vmax",
              zIndex: "2",
            }}
          />
          <Label>
            Upload image:
            <Input type="file" onChange={handleImageChange} />
          </Label>
          <Button variant="primary" onClick={handleImageUpload}>
            Upload Image
          </Button>
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
              <Input
                className={styles.inputField}
                placeholder="Website"
                defaultValue={profileData.href}></Input>
            </Label>
            <Label>
              <Input
                className={styles.inputField}
                placeholder="E-mail"
                defaultValue={profileData.contact}></Input>
            </Label>
            <Chips defaultValue={profileData.keywords} />
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
