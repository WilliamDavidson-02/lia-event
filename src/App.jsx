import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserContextProvider from "./context/UserContext";
import Login from "./pages/Login/Login";

const Home = lazy(() => import("./pages/Home/Home"));
const Onboarding = lazy(() => import("./pages/Onboarding/Onboarding"));
const Finder = lazy(() => import("./pages/Finder/Finder"));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense>
        <UserContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/login" element={<Login />} />
            <Route path="/finder" element={<Finder />} />
          </Routes>
        </UserContextProvider>
      </Suspense>
    </BrowserRouter>
  );
}
