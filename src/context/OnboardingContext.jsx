import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserContext from "../hooks/useUserContext";
import onboardingMap from "../lib/onboardingMap.json";
import {
  validateLength,
  validateOption,
  validateUrl,
  sanitize,
} from "../lib/util";

export const OnboardingContext = createContext(null);

export default function OnboardingContextProvider({ children }) {
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
      if (onboarding.location) {
        data.options.data.location = onboarding.location;
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

  return (
    <OnboardingContext.Provider
      value={{
        error,
        isValid,
        station,
        userType,
        isLoading,
        onboarding,
        credentials,
        currentField,
        currentFieldIndex,
        setStation,
        setUserType,
        setCredentials,
        setOnboardingValues,
        nextField,
        handleSkip,
        handlePrev,
        handleSubmit,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}
