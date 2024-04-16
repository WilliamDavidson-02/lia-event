import { useContext } from "react";
import styles from "./UserType.module.css";
import { OnboardingContext } from "../../context/OnboardingContext";
import Spline from "@splinetool/react-spline";

export default function UserType() {
  const { setUserType, nextField, setStation } = useContext(OnboardingContext);

  const handleUserType = (type) => {
    setUserType(type);
    nextField(0, type);
    setStation((prev) => prev + 1);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.choice}>
        <div>
          <strong>
            Thrilled to see your keen interest in our lively industry meet-up
            event!
          </strong>{" "}
          Before diving in, you need to swiftly set up an account and toss us a
          sprinkle of information about yourself or the company you represent.
        </div>
        <div>
          <div
            className={styles.container}
            onClick={() => handleUserType("student")}
          >
            <div className={styles.spline}>
              <Spline
                scene={
                  "https://prod.spline.design/E1MPFLmyNU1b0eVG/scene.splinecode"
                }
              />
            </div>
            <h1>Student</h1>
          </div>
          <div
            className={styles.container}
            onClick={() => handleUserType("company")}
          >
            <div className={styles.spline}>
              <Spline
                scene={
                  "https://prod.spline.design/kfJEJzfhsXIr0KjR/scene.splinecode"
                }
              />
            </div>
            <h1>Company</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
