import React, { useState } from "react";
import styles from "./Login.module.css";
import Input from "../../components/Input/Input.jsx";
import supabase from "../../config/supabaseConfig";
import Button from "../../components/Button/Button";
import OnboardingFooter from "../../components/OnboardingFooter/OnboardingFooter";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        setError(error.message);
      } else {
        console.log("User logged in: ", user);
        //redirect?
        navigate("/");
      }
    } catch (error) {
      console.log("Error logging in: ", error.message);
      setError(error.message);
    }
  };

  const withProvider = (event) => {
    event.preventDefault();
  };

  async function signInWithLinkedIn() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "linkedin_oidc",
    });
    //console.log(data);
  }

  async function signInWithDiscord() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
    });
  }

  async function signInWithGithub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
  }

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <section className={styles.login}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            type={"email"}
            labelText={"e-mail"}
            placeholderText={"joedoe@email.se"}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Input
            type={"password"}
            labelText={"password"}
            placeholderText={"tacopaj123!.."}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button className={styles.buttons} onSubmit={handleSubmit} variant="login">
            Login
          </Button>
          {error && <p>{error}</p>}
        </form>
        <div className={styles.loginOptions}>
          <Button
            square
            className={styles.buttons}
            onSubmit={withProvider}
            onClick={signInWithLinkedIn}
            variant="login">
            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_96_4)">
                <path
                  d="M19.0195 0H1.97656C1.16016 0 0.5 0.644531 0.5 1.44141V18.5547C0.5 19.3516 1.16016 20 1.97656 20H19.0195C19.8359 20 20.5 19.3516 20.5 18.5586V1.44141C20.5 0.644531 19.8359 0 19.0195 0ZM6.43359 17.043H3.46484V7.49609H6.43359V17.043ZM4.94922 6.19531C3.99609 6.19531 3.22656 5.42578 3.22656 4.47656C3.22656 3.52734 3.99609 2.75781 4.94922 2.75781C5.89844 2.75781 6.66797 3.52734 6.66797 4.47656C6.66797 5.42188 5.89844 6.19531 4.94922 6.19531ZM17.543 17.043H14.5781V12.4023C14.5781 11.2969 14.5586 9.87109 13.0352 9.87109C11.4922 9.87109 11.2578 11.0781 11.2578 12.3242V17.043H8.29688V7.49609H11.1406V8.80078H11.1797C11.5742 8.05078 12.543 7.25781 13.9844 7.25781C16.9883 7.25781 17.543 9.23438 17.543 11.8047V17.043Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_96_4">
                  <rect width="21" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Button>
          <Button
            square
            className={styles.buttons}
            onSubmit={withProvider}
            onClick={signInWithDiscord}
            variant="login">
            <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_96_6)">
                <path
                  d="M17.789 1.33294C16.4093 0.701268 14.9528 0.253139 13.4566 0C13.2518 0.366002 13.0666 0.74257 12.9016 1.12813C11.3079 0.887969 9.68715 0.887969 8.09342 1.12813C7.92835 0.742609 7.7431 0.366046 7.53845 0C6.0413 0.255277 4.58378 0.70447 3.20267 1.33624C0.460815 5.39287 -0.28246 9.34875 0.0891772 13.2485C1.69488 14.4348 3.49212 15.3371 5.40277 15.916C5.83299 15.3374 6.21368 14.7235 6.54081 14.0809C5.91948 13.8489 5.3198 13.5626 4.74869 13.2253C4.89899 13.1163 5.046 13.004 5.18804 12.895C6.84984 13.6765 8.6636 14.0817 10.5 14.0817C12.3364 14.0817 14.1501 13.6765 15.8119 12.895C15.9556 13.0123 16.1026 13.1246 16.2513 13.2253C15.6791 13.5631 15.0783 13.85 14.4559 14.0826C14.7826 14.7249 15.1633 15.3382 15.5939 15.916C17.5062 15.3394 19.3048 14.4376 20.9108 13.2501C21.3468 8.7277 20.1659 4.80816 17.789 1.33294ZM7.01155 10.8502C5.97592 10.8502 5.12032 9.91033 5.12032 8.75413C5.12032 7.59792 5.94619 6.64983 7.00824 6.64983C8.0703 6.64983 8.91929 7.59792 8.90112 8.75413C8.88295 9.91033 8.067 10.8502 7.01155 10.8502ZM13.9884 10.8502C12.9511 10.8502 12.0989 9.91033 12.0989 8.75413C12.0989 7.59792 12.9247 6.64983 13.9884 6.64983C15.0521 6.64983 15.8945 7.59792 15.8763 8.75413C15.8582 9.91033 15.0439 10.8502 13.9884 10.8502Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_96_6">
                  <rect width="21" height="15.916" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Button>
          <Button
            square
            className={styles.buttons}
            onSubmit={withProvider}
            onClick={signInWithGithub}
            variant="login">
            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_96_2)">
                <path
                  d="M10.5 -2.32765e-06C8.00482 -0.00247919 5.59028 0.862971 3.68908 2.44125C1.78789 4.01954 0.524315 6.20749 0.124804 8.61301C-0.274706 11.0185 0.21596 13.4844 1.50887 15.5687C2.80179 17.653 4.81243 19.2195 7.18049 19.9874C7.70904 20.0818 7.89596 19.7608 7.89596 19.4901C7.89596 19.2194 7.89596 18.6025 7.89596 17.7463C4.96318 18.3695 4.3444 16.3676 4.3444 16.3676C4.14983 15.7472 3.73649 15.2141 3.17773 14.8631C2.23022 14.2336 3.25508 14.2336 3.25508 14.2336C3.58722 14.2794 3.90434 14.3984 4.1824 14.5816C4.46047 14.7649 4.6922 15.0075 4.86005 15.2912C5.00267 15.5437 5.19495 15.7663 5.42585 15.9461C5.65676 16.1259 5.92175 16.2594 6.20561 16.339C6.48948 16.4185 6.78663 16.4425 7.08002 16.4096C7.37342 16.3767 7.65727 16.2876 7.9153 16.1473C7.95575 15.6294 8.18435 15.1427 8.55987 14.7749C6.22653 14.5168 3.77718 13.6355 3.77718 9.73875C3.76116 8.72079 4.14656 7.73581 4.85361 6.98772C4.5387 6.10263 4.57551 5.13432 4.95674 4.27447C4.95674 4.27447 5.83979 3.99748 7.8444 5.32578C9.56577 4.86418 11.3827 4.86418 13.1041 5.32578C15.1087 3.99748 15.9853 4.27447 15.9853 4.27447C16.3718 5.12523 16.4178 6.08658 16.1142 6.96884C16.8212 7.71692 17.2066 8.70191 17.1906 9.71986C17.1906 13.6607 14.7348 14.5231 12.395 14.7561C12.6459 15.0024 12.8397 15.2985 12.9631 15.6243C13.0866 15.9502 13.1368 16.2981 13.1105 16.6446C13.1105 18.017 13.1105 19.125 13.1105 19.4586C13.1105 19.7923 13.2974 20.0504 13.8324 19.9496C16.1735 19.1614 18.1541 17.5905 19.4241 15.5143C20.6942 13.4381 21.1721 10.9903 20.7734 8.60339C20.3747 6.21643 19.125 4.04392 17.2451 2.46964C15.3653 0.895364 12.9762 0.0206393 10.5 -2.32765e-06Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_96_2">
                  <rect width="21" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Button>
        </div>
        <OnboardingFooter>
          <Button square type="submit" style={{ marginBottom: "16px", marginRight: "16px" }} variant="login">
            <ArrowRight size={24} />
          </Button>
        </OnboardingFooter>
      </section>
    </div>
  );
}
