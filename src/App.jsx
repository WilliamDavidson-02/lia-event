import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserContextProvider from "./context/UserContext";

const Home = lazy(() => import("./pages/Home/Home"));
const Onboarding = lazy(() => import("./pages/Onboarding/Onboarding"));
const Login = lazy(() => import("./pages/Login/Login"));
const Profile = lazy(() => import("./pages/Profile/Profile"));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense>
        <UserContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </UserContextProvider>
      </Suspense>
    </BrowserRouter>
  );
}
