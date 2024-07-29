import logo from "../../assets/light_logo.svg";
import darklogo from "../../assets/dark_logo.svg";
import { useTheme } from "@/context/themeContext";
import ProfileMenu from "./ProfileMenu";
import { navlinks } from "./const";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

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
              className="text-gray-500 hover:text-foreground mx-2 text-xs sm:text-sm md:text-md  font-medium"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <SearchBar/>
        
        <div className="flex-shrink-0">
          <ProfileMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
