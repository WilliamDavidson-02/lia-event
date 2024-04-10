import supabase from "../../config/supabaseConfig";
import Chips from "../Chips/Chips";
import Image from "../Image/Image";
import Input from "../Input/Input";
import Label from "../Label/Label";
import OnboardingRadio from "../OnboardingRadio/OnboardingRadio";
import styles from "./ProfileEdit.module.css";
import onboardingMap from "../../lib/onboardingMap.json";
import keywords from "../../lib/keywords.json";
import Button from "../Button/Button";
import { useState } from "react";
import EditKeywords from "../EditKeywords/EditKeywords";
import GeoLocation from "../GeoLocation/GeoLocation";
import { defaultCords } from "../../lib/mapData";

export default function ProfileEdit({ profileType, profileData, closeEdit }) {
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState(profileData.avatar);
  const [selectedArea, setSelectedArea] = useState(profileData.area);

  const [selectedKeywords, setSelectedKeywords] = useState(profileData.keywords || []);

  const handleKeywordsChange = (keywords) => {
    setSelectedKeywords(keywords);
  };

  const keywordArea = profileType === "company" ? "developer" : "design";

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);

    const imagePreview = new FileReader();
    imagePreview.onload = (event) => {
      setImageURL(event.target.result);
    };
    imagePreview.readAsDataURL(file);
  };

  const handleEditImage = () => {
    document.getElementById("imgUpload").click();
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
    const avatarPrefix = import.meta.env.VITE_SUPABASE_AVATARS_BASE_URL;

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
  const areaQuestionStudent = onboardingQuestions.student[1];

  const handleAreaChange = (optionValue) => {
    setSelectedArea(optionValue);
  };

  const [location, setLocation] = useState(profileData.location || defaultCords);
  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
  };

  return (
    <div className={styles.container}>
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
          <div onClick={handleEditImage}>
            <label className={styles.editImgParagraph}>
              Edit profile picture
              <input
                id="imgUpload"
                type="file"
                accept="image/"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </label>
          </div>
          {/* <Label style={{ color: "white" }}>
            Upload image:
            <Input type="file" onChange={handleImageChange} />
          </Label>
          <Button variant="primary" onClick={handleImageUpload}>
            Upload Image
          </Button> */}
        </div>
        <h2>Editing Profile</h2>
        <Label style={{ color: "white" }}>
          Company name
          <Input
            style={{
              fontSize: "1.2rem",
              fontWeight: "600",
            }}
            className={styles.inputField}
            placeholder="Name"
            defaultValue={profileData.name}></Input>
        </Label>
        {profileType === "company" && (
          <>
            <Label style={{ color: "white" }}>
              Website
              <Input
                className={styles.inputField}
                placeholder="Website"
                defaultValue={profileData.href}></Input>
            </Label>
            <Label style={{ color: "white" }}>
              Contact mail
              <Input
                className={styles.inputField}
                placeholder="Enter mail"
                defaultValue={profileData.contact}></Input>
            </Label>

            <div className={styles.loginInfo}>
              <h2>Login Details:</h2>
              <Label style={{ color: "white" }}>
                Contact mail
                <Input
                  className={styles.inputField}
                  placeholder="Enter mail"
                  defaultValue={profileData.contact}></Input>
              </Label>
              <Label style={{ color: "white" }}>
                Password
                <Input className={styles.inputField} placeholder="New password"></Input>
              </Label>
            </div>

            <div>
              <h2>Looking for</h2>
              <div className={styles.radioBg}>
                <OnboardingRadio
                  variant="profile"
                  variantInput="profileRadio"
                  options={areaQuestionCompany.options}
                  selected={selectedArea}
                  handleProperty={handleAreaChange}
                />
              </div>
            </div>
            <EditKeywords
              handleProperty={handleKeywordsChange}
              selected={selectedKeywords}
              area={keywordArea}
            />
            <Label className={styles.location}>
              Location
              <GeoLocation handleProperty={handleLocationChange} />
            </Label>
          </>
        )}
        {profileType === "student" && (
          <>
            <div>
              Education
              {}
              <OnboardingRadio
                variant="profile"
                variantInput="profileRadio"
                options={areaQuestionStudent.options}
                selected={selectedArea}
                handleProperty={handleAreaChange}
              />
            </div>
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
