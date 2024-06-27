import logo from "../../assets/light_logo.svg"
import darklogo from "../../assets/dark_logo.svg"
import { useTheme } from "@/context/themeContext"
import ProfileMenu from "./ProfileMenu"

const Navbar = () => {
  const {theme} = useTheme()

  return (
    <>
    <div className="flex justify-between items-center bg-background px-6 py-2 border-b ">
        <div className="">
           {
              theme === "light" ? <img src={logo} alt="logo" className="max-w-20"/> : <img src={darklogo} alt="logo" className="max-w-24"/>
           }
        </div>
        <div>
          <ProfileMenu/>
        </div>
        
    </div>
    
    
    </>
  )
}

export default Navbar