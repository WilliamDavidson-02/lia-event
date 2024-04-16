import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserContextProvider from "./context/UserContext";
import Background from "./components/Background/Background";
import Nav from "./components/Nav/Nav";
import GuestRoute from "./GuestRoute";
import PrivateRoute from "./PrivateRoute";
import OnboardingContextProvider from "./context/OnboardingContext";

const Home = lazy(() => import("./pages/Home/Home"));
const Onboarding = lazy(() => import("./pages/Onboarding/Onboarding"));
const Login = lazy(() => import("./pages/Login/Login"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Finder = lazy(() => import("./pages/Finder/Finder"));
const RequestEmail = lazy(() => import("./pages/RequestEmail/RequestEmail"));
const UpdatePassword = lazy(() =>
  import("./pages/UpdatePassword/UpdatePassword")
);
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
const ConfirmEmail = lazy(() => import("./pages/ConfirmEmail/ConfirmEmail"));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense>
        <Background />
        <UserContextProvider>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/confirm-new-email" element={<ConfirmEmail />} />

            <Route element={<GuestRoute />}>
              <Route
                path="/onboarding"
                element={
                  <OnboardingContextProvider>
                    <Onboarding />
                  </OnboardingContextProvider>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/request-email" element={<RequestEmail />} />
            </Route>

            <Route element={<PrivateRoute />}>
              <Route
                path="/profile/:profileType/:profileID"
                element={<Profile />}
              />
              <Route path="/finder" element={<Finder />} />
              <Route path="/update-password" element={<UpdatePassword />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </UserContextProvider>
      </Suspense>
    </BrowserRouter>
  );
}
