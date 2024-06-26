
import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/Home"
import Login from "./pages/Auth/Login"
import { ThemeProvider } from "./context/themeContext"
import Navbar from "./components/General/Navbar"
import SignUp from "./pages/Auth/Signup"
import { Toaster } from "./components/ui/sonner"
import OTP from "./pages/Auth/OTP"
import Protected from "./components/Protected"
import ForgotPassword from "./pages/Auth/ForgotPassword"

function App() {

  return (
    <>
  
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar/>
        <Routes>
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/verify/:otp/:email" element={<OTP/>}></Route>
          <Route path=".forgot-password" element={<ForgotPassword/>}></Route>

          <Route element={<Protected/>}>
          <Route path="/" element={<HomePage/>}></Route>
          
          </Route>

        </Routes>
        <Toaster/>
      </ThemeProvider>
    </>
  )
}

export default App
