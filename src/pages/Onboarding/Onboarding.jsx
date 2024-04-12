import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  validateLength,
  validateOption,
  validateUrl,
  sanitize,
} from "../../lib/util";
import styles from "./Onboarding.module.css";
import Button from "../../components/Button/Button";
import OnboardingTextArea from "../../components/OnboardingTextArea/OnboardingTextArea";
import OnboardingRadio from "../../components/OnboardingRadio/OnboardingRadio";
import onboardingMap from "../../lib/onboardingMap.json";
import GeoLocation from "../../components/GeoLocation/GeoLocation";
import useUserContext from "../../hooks/useUserContext";
import Signup from "../../components/Signup/Signup";
import UserType from "../../components/UserType/UserType";
import EditKeywords from "../../components/EditKeywords/EditKeywords";
import { useWindowSize } from "@uidotdev/usehooks";

export default function Onboarding() {
  const [onboarding, setOnboarding] = useState({});
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const [currentField, setCurrentField] = useState(null);
  const [userType, setUserType] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [station, setStation] = useState(0); // 0, 1, 2 = {userType}, {email, password}, {onboarding steps}
  const [error, setError] = useState("");

  const { signUp } = useUserContext();

  const navigate = useNavigate();
  const size = useWindowSize();

  useEffect(() => {
    if (!currentField) return;

    const property = currentField.property;
    const field = onboarding[property];

    if (!property || field === undefined) return;

    if (property === "name") {
      setIsValid(validateLength(field, 2, 75));
    }

    if (property === "area") {
      setIsValid(validateOption(field, currentField.options));
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
            name: sanitize(name.trim()),
            area,
            user_type: userType,
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
        if (error.message.toLowerCase() === "user already registered") {
          setError(error.message);
          setStation(1);
        }
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
      [current.property]: onboarding[current.property] ?? current.defaultValue,
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

  const handlePrev = (type, index) => {
    const prevIndex = index - 1;
    const prevField = onboardingMap[type][prevIndex];

    setCurrentFieldIndex(prevIndex);
    setCurrentField(prevField);
  };

  const handleUserType = (type) => {
    setUserType(type);
    nextField(0, type);
    setStation((prev) => prev + 1);
  };

  if (station === 0) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.choice}>
          <div>
            <strong>
              Thrilled to see your keen interest in our lively industry meet-up
              event!
            </strong>{" "}
            Before diving in, you need to swiftly set up an account and toss us
            a sprinkle of information about yourself or the company you
            represent.
          </div>
          <div>
            <UserType
              onClick={() => handleUserType("student")}
              title={"Student"}
            />
            <UserType
              onClick={() => handleUserType("company")}
              title={"Company"}
            />
          </div>
        </div>
      </div>
    );
  }

  if (station === 1) {
    return (
      <Signup
        credentials={credentials}
        setCredentials={setCredentials}
        next={() => setStation(station + 1)}
        error={error}
      />
    );
  }

  return (
    <div className={styles.wrapper}>
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
          {currentField.type === "radio" && (
            <OnboardingRadio
              options={currentField.options}
              handleProperty={setOnboardingValues}
              selected={onboarding[currentField.property]}
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
                currentField.type === "link" ? "https://yrgo.se" : "Type ..."
              }
            />
          )}
          {currentField.type === "chip" && (
            <EditKeywords
              handleProperty={setOnboardingValues}
              selected={onboarding[currentField.property]}
              area={onboarding.area}
            />
          )}
          <div className={styles.footer}>
            {currentFieldIndex > 0 && (
              <Button
                disabled={isLoading}
                variant={"tertiery"}
                size={size.width <= 760 ? "md" : "lg"}
                type={"button"}
                onClick={() => handlePrev(userType, currentFieldIndex)}
              >
                <ChevronLeft size={size.width <= 760 ? 24 : 28} />
                Prev
              </Button>
            )}
            <div className={styles.right}>
              {!currentField.required && (
                <Button
                  disabled={isLoading}
                  onClick={handleSkip}
                  type={"button"}
                  variant={"tertiery"}
                  size={size.width <= 760 ? "md" : "lg"}
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
                <ArrowRight
                  size={size.width <= 760 ? 24 : 48}
                  strokeWidth={size.width <= 760 ? 2 : 1}
                />
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
