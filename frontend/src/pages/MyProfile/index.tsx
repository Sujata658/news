import { Button } from "@/components/ui/button";
import { useUser } from "@/context/userContext";
import { Link } from "react-router-dom";

const MyProfile = () => {
    const { user } = useUser();

    return (
        <div className="flex items-center justify-center h-[90vh]">
            {user ? (
                <div className="flex flex-col items-center space-y-6 py-16 bg-background shadow-lg min-w-[40vw] border border-foreground/20 rounded-[5px]">
                    <div className="w-36 h-36 rounded-full bg-gray-200 flex items-center justify-center text-4xl font-bold text-gray-600">
                        {user.fname && user.fname.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-center">
                        <h1 className="text-3xl font-semibold">{user.fname} {user.lname}</h1>
                        <p className="text-gray-600">{user.email}</p>
                        <p className="mt-4 text-gray-600">{user.phone}</p>
                    </div>
                    <Link to="/profile/settings">
                        <Button className="mt-4">
                            Edit Profile
                        </Button>
                    </Link>
                </div>
            ) : (
                <h1 className="text-center text-xl font-semibold">Loading...</h1>
            )}
        </div>
    );
};

export default MyProfile;
