import { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useWindowSize } from "@uidotdev/usehooks";
import supabase from "../../config/supabaseConfig";
import Image from "../Image/Image";
import Input from "../Input/Input";
import Label from "../Label/Label";
import Radios from "../Radios/Radios";
import styles from "./ProfileEdit.module.css";
import onboardingMap from "../../lib/onboardingMap.json";
import Initials from "../Initials/Initials";
import Button from "../Button/Button";
import EditKeywords from "../EditKeywords/EditKeywords";
import GeoLocation from "../GeoLocation/GeoLocation";
import useUserContext from "../../hooks/useUserContext";
import {
  validateEmail,
  validateLength,
  validateUrl,
  sanitize,
} from "../../lib/util";
import Dialog from "../Dialog/Dialog";
import { Loader } from "lucide-react";

const baseUrl = import.meta.env.VITE_SUPABASE_AVATARS_BASE_URL;

export default function ProfileEdit({ profile, setProfile, closeEdit }) {
  const { user } = useUserContext();
  const { profileType } = useParams();
  const [form, setForm] = useState(profile);
  const [newPassword, setNewPassword] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setisUploading] = useState(false);
  const [newEmailError, setNewEmailError] = useState(false);

  const isNameValid = useMemo(
    () => validateLength(form.name, 2, 75),
    [form.name]
  );
  const isUrlValid = useMemo(() => {
    if (profileType === "student" && !form.href) return true;
    return validateUrl(form.href);
  }, [form.href]);
  const isEmailValid = useMemo(
    () => validateEmail(form.user_email),
    [form.user_email]
  );
  const isContactEmailValid = useMemo(
    () => validateEmail(form.contact),
    [form.contact]
  );
  const isPasswordValid = useMemo(() => {
    if (!newPassword) return true;

    return validateLength(newPassword, 8);
  }, [newPassword]);

  let isValid = isEmailValid && isNameValid && isPasswordValid && isUrlValid;

  if (profileType === "company") {
    isValid = isValid && isContactEmailValid;
  }

  const size = useWindowSize();

  const handleInputChange = (prop, value) => {
    setForm((prev) => ({ ...prev, [prop]: value }));
  };

  const handlePropertyChange = (prop, callback) => (value) => {
    callback((prev) => ({ ...prev, [prop]: value }));
  };

  const handleImageUpload = async (event) => {
    event.preventDefault();

    if (!event.target.files && !event.target.files[0]) return;

    setisUploading(true);

    const file = event.target.files[0];

    const { error: errorRemove } = await supabase.storage
      .from("avatars")
      .remove([form.avatar]);

    if (errorRemove) {
      setisUploading(false);
      console.log("No image found");
      return;
    }

    const fileName = file.name.trim().replace(/[-\s]/g, "_").toLowerCase();
    const avatarFileName = `${new Date().getTime()}_${fileName}`;

    const { error } = await supabase.storage
      .from("avatars")
      .upload(avatarFileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      setisUploading(false);
      console.error("Error uploading image", error.message);
      return;
    }

    const { error: userError } = await supabase
      .from("profile")
      .update({ avatar: avatarFileName })
      .eq("id", user.id);

    setisUploading(false);

    if (userError) {
      console.error("Error updating user avatar", userError.message);
      return;
    }

    setForm((prev) => ({ ...prev, avatar: avatarFileName }));
  };

  const handleSaveSettings = async (event) => {
    event.preventDefault();

    if (!isValid) return;

    setIsLoading(true);

    let { name, href, area, user_email, keywords, avatar } = form;
    name = sanitize(name).trim();

    let updateUserData = {
      data: { name, href, area, user_email, keywords, avatar },
    };

    if (profileType === "company") {
      updateUserData.data.contact = form.contact;
      updateUserData.data.location = form.location;
    }

    let prevEmail = user.email;

    if (user_email !== prevEmail) {
      updateUserData.email = user_email;
    }

    if (newPassword) {
      updateUserData.password = newPassword;
    }

    const { error: userError } = await supabase.auth.updateUser(updateUserData);

    setIsLoading(false);

    if (userError) {
      if (userError.status === 422) {
        setNewEmailError(true);
      }
      console.error("Error updating user profile: ", userError.message);
      return;
    }

    if (user_email !== prevEmail) {
      setShowDialog(true);
      return;
    }

    setProfile(form);
    closeEdit();
  };

  const handleCloseDialog = () => {
    setProfile(form);
    setShowDialog(false);
    closeEdit();
  };

  const setSelected = (selected) => {
    setForm((prev) => ({ ...prev, keywords: selected }));
  };

  const handleCancel = () => {
    setProfile(profile);
    closeEdit();
  };

  return (
    <>
      {showDialog && (
        <Dialog
          setShow={handleCloseDialog}
          title={"We see you changed your login email. "}
          description={
            "Don’t forget to confirm the change from the old e-mail you provided to make the change go through."
          }
        />
      )}
      <div className={styles.container}>
        <form className={styles.form} autoComplete="off" autoCorrect="off">
          <div className={styles.card}>
            <div className={styles.section}>
              <label htmlFor={"imgUpload"} className={styles.editImage}>
                <div className={styles.avatar}>
                  {isUploading && (
                    <div className={styles.uploading}>
                      <Loader
                        className={"loader"}
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                  )}
                  {form.avatar ? (
                    <Image
                      src={`${baseUrl}/${form.avatar}`}
                      style={{ aspectRatio: 1 / 1 }}
                    />
                  ) : (
                    <Initials
                      name={form.name}
                      size={profileType && size.width >= 760 ? "lg" : "md"}
                      style={{ aspectRatio: 1 / 1 }}
                    />
                  )}
                </div>
                <p className={styles.editImgParagraph}>Edit</p>
                <input
                  id="imgUpload"
                  type="file"
                  accept="image/jpeg, image/png, image/webp, image/gif, image/jpg"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            <div className={styles.section}>
              <div className={styles.field}>
                <Label htmlFor={"name"}>
                  {profileType === "company" ? "Company name" : "Name"}
                </Label>
                <Input
                  id="name"
                  variant="dark-blue"
                  isError={!isNameValid}
                  placeholder={"Name"}
                  onChange={(ev) => handleInputChange("name", ev.target.value)}
                  value={form.name}
                />
              </div>
              <div className={styles.field}>
                <Label htmlFor={"href"}>
                  {profileType === "company"
                    ? "Company website"
                    : "Portfolio link"}
                </Label>
                <Input
                  variant="dark-blue"
                  placeholder="Website"
                  id="href"
                  isError={!isUrlValid}
                  onChange={(ev) => handleInputChange("href", ev.target.value)}
                  value={form.href || ""}
                />
              </div>
              {profileType === "company" && (
                <div className={styles.field}>
                  <Label htmlFor={"contact-email"}>Contact mail</Label>
                  <Input
                    isError={!isContactEmailValid}
                    variant="dark-blue"
                    placeholder="Enter mail"
                    id="contact-email"
                    onChange={(ev) =>
                      handleInputChange("contact", ev.target.value)
                    }
                    value={form.contact}
                  />
                </div>
              )}
            </div>
            <div className={styles.section}>
              <h2>Login details</h2>
              <div className={styles.field}>
                <Label htmlFor={"email"}>Email</Label>
                <Input
                  isError={!isEmailValid}
                  variant="dark-blue"
                  placeholder="Enter mail"
                  id="email"
                  onChange={(ev) =>
                    handleInputChange("user_email", ev.target.value)
                  }
                  value={form.user_email}
                />
                {newEmailError && (
                  <p className={styles.emailError}>Email already in use</p>
                )}
              </div>
              <div className={styles.field}>
                <Label htmlFor={"new-password"}>Password</Label>
                <Input
                  isError={!isPasswordValid}
                  variant="dark-blue"
                  id="new-password"
                  placeholder="New password"
                  type={"password"}
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                />
              </div>
            </div>
          </div>
          <div className={styles.about}>
            <div className={styles.card}>
              <div className={styles.section}>
                <h2>
                  {profileType === "company" ? "Looking for" : "Education"}
                </h2>
                <div className={styles.radioBg}>
                  <Radios
                    variant="profile"
                    name="area"
                    variantInput="profileRadio"
                    options={
                      profileType === "company"
                        ? onboardingMap.company[1].options
                        : onboardingMap.student[1].options
                    }
                    selected={form.area}
                    handleProperty={handlePropertyChange("area", setForm)}
                  />
                </div>
                <div className={styles.keywordsContainer}>
                  <h2>
                    {profileType === "company"
                      ? "Expertise wanted"
                      : "Expertise"}
                  </h2>
                  <EditKeywords
                    name="keywords"
                    handleProperty={handlePropertyChange("keywords", setForm)}
                    selected={form.keywords}
                    setSelected={setSelected}
                    area={form.area}
                  />
                </div>
              </div>
            </div>
            {profileType === "company" && (
              <div className={styles.card}>
                <div className={styles.section}>
                  <h2>Location</h2>
                  <div className={styles.geoContainer}>
                    <GeoLocation
                      position={form.location}
                      handleProperty={handlePropertyChange("location", setForm)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className={styles.buttons}>
            <Button type={"button"} variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSaveSettings}
              disabled={!isValid || isLoading}
            >
              Save Settings
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
