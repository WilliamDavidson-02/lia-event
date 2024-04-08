import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserContextProvider from "./context/UserContext";
import Background from "./components/Background/Background";

const Home = lazy(() => import("./pages/Home/Home"));
const Onboarding = lazy(() => import("./pages/Onboarding/Onboarding"));
const Login = lazy(() => import("./pages/Login/Login"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Finder = lazy(() => import("./pages/Finder/Finder"));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense>
        <Background />
        <UserContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile/:profileID/:profileType" element={<Profile />} />
            <Route path="/finder" element={<Finder />} />
          </Routes>
        </UserContextProvider>
      </Suspense>
    </BrowserRouter>
  );
}
