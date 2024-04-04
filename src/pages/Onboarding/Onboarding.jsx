import { useEffect, useState } from "react";
import X from "../../components/X/X";
import Button from "../../components/Button/Button";
import styles from "./Onboarding.module.css";
import OnboardingTextArea from "../../components/OnboardingTextArea/OnboardingTextArea";
import OnboardingRadio from "../../components/OnboardingRadio/OnboardingRadio";
import onboardingMap from "../../lib/onboardingMap.json";
import ChipsGrid from "../../components/ChipsGrid/ChipsGrid";
import { ArrowRight } from "lucide-react";
import OnboardingFooter from "../../components/OnboardingFooter/OnboardingFooter";
import GeoLocation from "../../components/GeoLocation/GeoLocation";
import OnboardingCheckBoxes from "../../components/OnboardingCheckBoxes/OnboardingCheckBoxes";
import Input from "../../components/Input/Input";
import keywords from "../../lib/keywords.json";
import useUserContext from "../../hooks/useUserContext";
import { useNavigate } from "react-router-dom";
import {
  validateLength,
  validateOption,
  validateUrl,
} from "../../lib/validations";
import Signup from "../../components/Signup/Signup";
import UserType from "../../components/UserType/UserType";

export default function Onboarding() {
  const [onboarding, setOnboarding] = useState({});
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const [currentField, setCurrentField] = useState(null);
  const [userType, setUserType] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [station, setStation] = useState(0); // 0, 1, 2 = {email, password}, {userType}, {onboarding steps}

  const { signUp } = useUserContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentField) return;

    const property = currentField.property;
    const field = onboarding[property];

    if (property === "name") {
      setIsValid(validateLength(field, 2, 75));
    }

    if (["area", "employees"].includes(property)) {
      let value = field;
      if (typeof value === "string") value = [value];

      setIsValid(validateOption(value, currentField.options));
    }

    if (property === "href") {
      setIsValid(validateUrl(field));
    }

    if (property === "keywords") {
      setIsValid(validateLength(field, 1));
    }

    if (property === "location") {
      setIsValid(field.length === 2);
    }
  }, [onboarding, currentField]);

  const setOnboardingValues = (value) => {
    const property = currentField.property;

    setOnboarding((prev) => ({
      ...prev,
      [property]: value,
    }));
  };

  const handleSubmit = async (ev, isSkipped) => {
    ev.preventDefault();

    if (!isValid && !isSkipped) return;

    if (currentFieldIndex < onboardingMap[userType].length - 1) {
      // There are still more questions
      const nextIndex = currentFieldIndex + 1;

      nextField(nextIndex);

      setCurrentFieldIndex(nextIndex);
      setIsValid(false);
    } else {
      // All questions answered
      setIsloading(true);

      const { name, area } = onboarding;
      const { email, password } = credentials;

      // Default data
      let data = {
        email: email.toLowerCase().trim(),
        password,
        options: {
          data: {
            name: name.trim(),
            area,
            userType,
          },
        },
      };

      if (onboarding.href) {
        data.options.data.href = onboarding.href;
      }
      if (onboarding.employees) {
        data.options.data.employees = onboarding.employees;
      }
      if (onboarding.keywords) {
        data.options.data.keywords = onboarding.keywords;
      }
      if (userType === "company") {
        data.options.data.contact = email;
      }

      const { error } = await signUp(data);

      setIsloading(false);

      if (error) {
        console.log(error);
        return;
      }

      navigate("/");
    }
  };

  const nextField = (index, initType) => {
    const current = onboardingMap[userType || initType][index];

    // Set default value for property
    setOnboarding((prev) => ({
      ...prev,
      [current.property]: current.defaultValue,
    }));

    setCurrentField(current);
  };

  const handleSkip = () => {
    // Remvoe skipped property
    const onboardinObj = onboarding;

    delete onboardinObj[currentField.property];

    setOnboarding(onboardinObj);

    handleSubmit(new Event("submit"), true);
  };

  const getKeywords = (area) => {
    // Student can only select one area/program, Check if area is a string and wrapp it in an array
    if (typeof area === "string") area = [area];

    let keywordsArray = [];

    // Add selected areas of work keywords
    area.forEach((item) => {
      if (keywords[item]) {
        keywordsArray = [...keywordsArray, ...keywords[item]];
      }
    });

    return keywordsArray;
  };

  const handleUserType = (type) => {
    setUserType(type);
    nextField(0, type);
    setStation(2);
  };

  if (station === 0) {
    return (
      <Signup
        credentials={credentials}
        setCredentials={setCredentials}
        next={() => setStation(1)}
      />
    );
  }

  if (station === 1) {
    return (
      <div className={styles.wrapper}>
        <UserType onClick={() => handleUserType("student")} title={"Student"} />
        <UserType onClick={() => handleUserType("company")} title={"Company"} />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <X to={"/"} />
      </div>
      <form
        autoComplete="off"
        autoCorrect="off"
        className={styles.container}
        onSubmit={handleSubmit}
      >
        <h1 className={styles.title}>{currentField.question}</h1>
        <div className={styles.card}>
          {currentField.type === "map" && (
            <GeoLocation handleProperty={setOnboardingValues} />
          )}
          {currentField.type === "check" && (
            <OnboardingCheckBoxes
              handleProperty={setOnboardingValues}
              options={currentField.options}
              checkedValues={onboarding[currentField.property]}
            />
          )}
          {currentField.type === "radio" && (
            <OnboardingRadio
              options={currentField.options}
              handleProperty={setOnboardingValues}
              selectedValue={onboarding[currentField.property]}
            />
          )}
          {["text", "link"].includes(currentField.type) && (
            <OnboardingTextArea
              autoFocus
              id={currentField.property}
              handleSubmit={handleSubmit}
              handleProperty={setOnboardingValues}
              propertyValue={onboarding[currentField.property]}
              placeholder={
                currentField.type === "link" ? "https://name.com" : "Type ..."
              }
            />
          )}
          {currentField.type === "password" && (
            <Input
              autoFocus
              id={currentField.property}
              variant="lg-transparent"
              style={{ marginBottom: "auto" }}
              type="password"
              placeholder="Type ..."
              value={onboarding[currentField.property]}
              onChange={(event) => setOnboardingValues(event.target.value)}
            />
          )}
          {currentField.type === "chip" && (
            <ChipsGrid
              isEdit
              chipValues={getKeywords(onboarding.area)}
              handleProperty={setOnboardingValues}
              selectedChips={onboarding[currentField.property]}
            />
          )}
          <OnboardingFooter
            style={{ marginBottom: "16px", marginRight: "16px" }}
          >
            {!currentField.required && (
              <Button
                disabled={isLoading}
                onClick={handleSkip}
                type="button"
                variant="secondary"
              >
                Skip
              </Button>
            )}
            <Button
              disabled={isLoading || !isValid}
              isLoading={isLoading}
              square
              type="submit"
            >
              <ArrowRight size={24} />
            </Button>
          </OnboardingFooter>
        </div>
      </form>
    </div>
  );
}
