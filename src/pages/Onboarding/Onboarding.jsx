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
import UserTypeSelect from "../../components/UserTypeSelect/UserTypeSelect";
import GDPR from "../../components/GDPR/GDPR";
import Input from "../../components/Input/Input";
import keywords from "../../lib/keywords.json";
import useUserContext from "../../hooks/useUserContext";
import { useNavigate } from "react-router-dom";
import {
  validateEmail,
  validateLength,
  validateOption,
  validateUrl,
} from "../../lib/validations";

export default function Onboarding() {
  const [onboarding, setOnboarding] = useState({});
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const [currentField, setCurrentField] = useState(null);
  const [isGdprConfirmed, setIsGdprConfirmed] = useState(false);
  const [userType, setUserType] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const { signUp } = useUserContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentField) return;

    const property = currentField.property;
    const field = onboarding[property];

    if (property === "email") {
      setIsValid(validateEmail(field));
    }

    if (property === "password") {
      setIsValid(validateLength(field, 8));
    }

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

  useEffect(() => {
    if (isGdprConfirmed && userType) nextField(currentFieldIndex);
  }, [userType]);

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

      const { email, password, name, area } = onboarding;

      // Default credentials
      let credentials = {
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
        credentials.options.data.href = onboarding.href;
      }
      if (onboarding.employees) {
        credentials.options.data.employees = onboarding.employees;
      }
      if (onboarding.keywords) {
        credentials.options.data.keywords = onboarding.keywords;
      }
      if (userType === "company") {
        credentials.options.data.contact = email;
      }

      const { error } = await signUp(credentials);

      setIsloading(false);

      if (error) {
        console.log(error);
        return;
      }

      navigate("/");
    }
  };

  const nextField = (index) => {
    const current = onboardingMap[userType][index];

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

  if (!currentField) {
    return (
      <div className={styles.wrapper}>
        <GDPR setIsConfirmed={setIsGdprConfirmed} />
        <UserTypeSelect
          disabled={!isGdprConfirmed}
          types={["company", "student"]}
          setType={setUserType}
        />
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
