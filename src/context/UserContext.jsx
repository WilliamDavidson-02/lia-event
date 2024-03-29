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
      console.log("Sign up failed", error);
      return error;
    }

    const { error: signInError } = signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (signInError) {
      console.log("Account created sign in failed", signInError);
      error = signInError;
      return error;
    }

    return error;
  };

  const signInWithPassword = async (credentials) => {
    const { data, error } = await supabase.auth.signInWithPassword(credentials);

    if (error) {
      console.log("Sign in failed, check credentials", error);
      return error;
    }

    setUser(data.user);

    return error;
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
      console.log("Error fetching user data.");
      return;
    }

    setUser(data.user);
  };

  return (
    <UserContext.Provider
      value={{ user, signInWithPassword, signOut, signUp, getUser }}
    >
      {children}
    </UserContext.Provider>
  );
}
