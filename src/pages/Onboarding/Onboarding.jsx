import { useContext } from "react";
import Signup from "../../components/Signup/Signup";
import UserType from "../../components/UserType/UserType";
import { OnboardingContext } from "../../context/OnboardingContext";
import OnboardingQuestions from "../../components/OnboardingQuestions/OnboardingQuestions";

export default function Onboarding() {
  const { station } = useContext(OnboardingContext);

  return (
    <>
      {station === 0 && <UserType />}
      {station === 1 && <Signup />}
      {station === 2 && <OnboardingQuestions />}
    </>
  );
}
