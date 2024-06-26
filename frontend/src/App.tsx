import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import Login from "./pages/Auth/Login";
import { ThemeProvider } from "./context/themeContext";
import SignUp from "./pages/Auth/Signup";
import { Toaster } from "./components/ui/sonner";
import OTP from "./pages/Auth/OTP";
import Protected from "./components/Protected";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import MyProfile from "./pages/MyProfile";
import Preferences from "./pages/Preferences";
import Settings from "./pages/Settings";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify/:otp/:email" element={<OTP />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route element={<Protected />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile/me" element={<MyProfile />} />
            <Route path="/profile/preferences" element={<Preferences/>} />
            <Route path="/profile/settings" element={<Settings/>} />
          </Route>
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
        <Toaster />
      </ThemeProvider>
    </>
  );
}

export default App;
