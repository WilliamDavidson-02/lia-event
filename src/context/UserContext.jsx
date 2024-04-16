import { createContext, useEffect, useState } from "react";
import supabase from "../config/supabaseConfig";

export const UserContext = createContext(null);

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUser();
  }, []);

  const signUp = async (credentials) => {
    const { data, error } = await supabase.auth.signUp(credentials);

    if (error) return { error };

    const { error: signInError } = signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (signInError) {
      const error = signInError;
      return error;
    }

    setUser(data.user);
    return { error };
  };

  const signInWithPassword = async (credentials) => {
    const { data, error } = await supabase.auth.signInWithPassword(credentials);

    if (error) return { error };

    setUser(data.user);
    return { error: null };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (!error) setUser(null);
  };

  const getUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      setIsLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.getUser();

    if (error) {
      console.error("Error fetching user data.", error);
      return;
    }

    setUser(data.user);
    setIsLoading(false);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        signInWithPassword,
        signOut,
        signUp,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
