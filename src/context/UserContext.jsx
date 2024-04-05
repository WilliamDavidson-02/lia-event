import { createContext, useEffect, useState } from "react";
import supabase from "../config/supabaseConfig";

export const UserContext = createContext(null);

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  const signUp = async (credentials) => {
    const { error } = await supabase.auth.signUp(credentials);

    if (error) {
      console.error(error);
      return { error: "Sign up failed" };
    }

    const { error: signInError } = signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (signInError) {
      console.log("Account created sign in failed", signInError);
      const error = signInError;
      return error;
    }

    return { error: null };
  };

  const signInWithPassword = async (credentials) => {
    const { data, error } = await supabase.auth.signInWithPassword(credentials);

    if (error) {
      console.log("Sign in failed, check credentials", error);
      return error;
    }

    setUser(data.user);

    return { error: null };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
    }
  };
  const getUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return;
    }

    const { data, error } = await supabase.auth.getUser();

    if (error) {
      console.error("Error fetching user data.", error);
      return;
    }

    const user = data.user;

    if (user.user_metadata.user_type === "student") {
      // Student area is selected in a radio component, selected value requires a string
      const area = user.user_metadata.area;
      if (typeof area === "object") {
        user.user_metadata.area = area[0];
      }
    }

    setUser(user);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        signInWithPassword,
        signOut,
        signUp,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
