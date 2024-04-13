import supabase from "../../config/supabaseConfig";
import Chips from "../Chips/Chips";
import Image from "../Image/Image";
import Input from "../Input/Input";
import Label from "../Label/Label";
import Radios from "../Radios/Radios";
import styles from "./ProfileEdit.module.css";
import onboardingMap from "../../lib/onboardingMap.json";
import keywords from "../../lib/keywords.json";
import Button from "../Button/Button";
import { useState } from "react";
import EditKeywords from "../EditKeywords/EditKeywords";
import GeoLocation from "../GeoLocation/GeoLocation";
import { defaultCords } from "../../lib/mapData";

export default function ProfileEdit({
  profileType,
  profileData,
  setProfileData,
  closeEdit,
}) {
  const [newPassword, setNewPassword] = useState({
    password: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState(profileData.avatar);
  const [selectedArea, setSelectedArea] = useState(profileData.area);

  const [selectedKeywords, setSelectedKeywords] = useState(
    profileData.keywords || []
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfileData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  console.log(profileData.area);

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

  const handleImageUpload = async () => {
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

  const [location, setLocation] = useState(
    profileData.location || defaultCords
  );
  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
  };

  const handleSaveSettings = async (event) => {
    event.preventDefault();
    handleImageUpload();

    const { data: userData, error: userError } = await supabase
      .from("profile")
      .update({
        name: profileData.name,
        href: profileData.href,
        //contact: profileData.mail,
        //email,
        //password,
        area: selectedArea,
        keywords: profileData.keywords,
        //location: location,
      })
      .eq("id", profileData.id);

    if (userError) {
      console.error("Error updating user profile: ", userError.message);
      return;
    }
    closeEdit();
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
        </div>
        <h2>Editing Profile</h2>
        <Label style={{ color: "white" }}>
          Company name
          <Input
            style={{
              fontSize: "1.2rem",
              fontWeight: "600",
            }}
            name="name"
            className={styles.inputField}
            placeholder="Name"
            onChange={handleInputChange}
            value={profileData.name}
          />
        </Label>
        {profileType === "company" && (
          <>
            <Label style={{ color: "white" }}>
              Website
              <Input
                className={styles.inputField}
                placeholder="Website"
                name="href"
                onChange={handleInputChange}
                value={profileData.href}
              ></Input>
            </Label>
            <Label style={{ color: "white" }}>
              Contact mail
              <Input
                className={styles.inputField}
                placeholder="Enter mail"
                name="contact"
                onChange={handleInputChange}
                value={profileData.contact}
              ></Input>
            </Label>

            <div className={styles.elementContainer}>
              <h2>Login Details:</h2>
              <Label style={{ color: "white" }}>
                Email
                <Input
                  className={styles.inputField}
                  placeholder="Enter mail"
                  name="email"
                  onChange={handleInputChange}
                ></Input>
              </Label>
              <Label style={{ color: "white" }}>
                Password
                <Input
                  className={styles.inputField}
                  name="password"
                  placeholder="New password"
                  onChange={handleInputChange}
                ></Input>
              </Label>
            </div>

            <div className={styles.elementContainer}>
              <h2>Looking for</h2>
              <div className={styles.radioBg}>
                <Radios
                  variant="profile"
                  name="area"
                  variantInput="profileRadio"
                  options={areaQuestionCompany.options}
                  selected={selectedArea}
                  handleProperty={handleAreaChange}
                />
              </div>
            </div>

            <EditKeywords
              name="keywords"
              handleProperty={handleKeywordsChange}
              selected={profileData.keywords}
              area={keywordArea}
            />
            <div className={styles.elementContainer}>
              <Label className={styles.location}>
                <h2>Location</h2>
                <GeoLocation handleProperty={handleLocationChange} />
              </Label>
            </div>
          </>
        )}
        {profileType === "student" && (
          <>
            <div>
              Education
              {}
              <Radios
                variant="profile"
                variantInput="profileRadio"
                name="area"
                options={areaQuestionStudent.options}
                selected={selectedArea}
                handleProperty={handleAreaChange}
              />
            </div>
            <Label>
              <Input
                className={styles.inputField}
                placeholder="Website"
                name="href"
                value={profileData.href}
                onChange={handleInputChange}
              ></Input>
            </Label>
            <Label>
              <Input
                className={styles.inputField}
                placeholder="E-mail"
                name="contact"
                value={profileData.contact}
                onChange={handleInputChange}
              ></Input>
            </Label>

            <Chips defaultValue={profileData.keywords} />

            <div className={styles.loginInfo}>
              <h2>Login Details:</h2>
              <Label style={{ color: "white" }}>
                Email
                <Input
                  className={styles.inputField}
                  placeholder="Enter mail"
                  name="email"
                  onChange={handleInputChange}
                ></Input>
              </Label>
              <Label style={{ color: "white" }}>
                Password
                <Input
                  className={styles.inputField}
                  name="password"
                  placeholder="New password"
                  onChange={handleInputChange}
                ></Input>
              </Label>
            </div>
          </>
        )}
        <div className={styles.buttons}>
          <Button variant="secondary" onClick={closeEdit}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveSettings}>
            Save Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
