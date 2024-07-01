import logo from "../../assets/light_logo.svg";
import darklogo from "../../assets/dark_logo.svg";
import { useTheme } from "@/context/themeContext";
import ProfileMenu from "./ProfileMenu";
import { IoSearch } from "react-icons/io5";
import { navlinks } from "./const";
import { Link } from "react-router-dom";
import { Input } from "../ui/input";

const Navbar = () => {
  const { theme } = useTheme();


  return (
    <nav className="bg-background px-4 sm:px-6 lg:px-8 py-2 border-b">
      <div className="flex justify-between items-center">
        <div>
          {
            theme === "light" ? <img src={logo} alt="logo" className="max-w-20" /> : <img src={darklogo} alt="logo" className="max-w-20" />
          }
        </div>
        <div className="flex space-x-4 md:space-x-8 md:mx-8">
          {navlinks.map((link, index) => (
            <Link
              to={link.to}
              key={index}
              className="text-gray-500 hover:text-gray-700 mx-2 text-xs sm:text-sm md:text-md  font-medium"
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="flex-1 mx-4 relative">
          <div className="absolute inset-y-0 left-0 pl-2 z-10 md:pl-4 flex items-center">
            <IoSearch
              className="text-gray-500 cursor-pointer"
            />
          </div>
          <Input
            type="text"
            placeholder="Search"
            className={`bg-background border text-sm sm:text-sm md:text-md  border-gray-400 placeholder-gray-500 rounded-full py-2 px-4 pl-10 w-full focus:outline-none focus:border-none focus-visible:none :border-white focus-visible::shadow-md block
             `}
          />
        </div>
        <div className="flex-shrink-0">
          <ProfileMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
