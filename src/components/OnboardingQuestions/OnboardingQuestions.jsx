import { ArrowRight, ChevronLeft } from "lucide-react";
import { useWindowSize } from "@uidotdev/usehooks";
import Button from "../Button/Button";
import Textarea from "../Textarea/Textarea";
import Radios from "../Radios/Radios";
import GeoLocation from "../GeoLocation/GeoLocation";
import EditKeywords from "../EditKeywords/EditKeywords";
import styles from "./OnboardingQuestions.module.css";
import { useContext } from "react";
import { OnboardingContext } from "../../context/OnboardingContext";

export default function OnboardingQuestions() {
  const {
    handleSubmit,
    setOnboardingValues,
    currentField,
    onboarding,
    currentFieldIndex,
    userType,
    isLoading,
    handleSkip,
    handlePrev,
    isValid,
  } = useContext(OnboardingContext);

  const size = useWindowSize();

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
            <GeoLocation
              handleProperty={setOnboardingValues}
              position={onboarding[currentField.property]}
            />
          )}
          {currentField.type === "radio" && (
            <Radios
              options={currentField.options}
              handleProperty={setOnboardingValues}
              selected={onboarding[currentField.property]}
            />
          )}
          {["text", "link"].includes(currentField.type) && (
            <Textarea
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
              setSelected={setOnboardingValues}
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
