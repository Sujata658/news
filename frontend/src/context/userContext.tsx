import { User } from "@/types/users";
import React, { useContext, useState, useEffect } from "react";
import { createContext } from "react";
import { usePreference } from "./prefContext";

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {},
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const { setPreferences } = usePreference();

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            if (user.preferences !== undefined) {
                setPreferences(user.preferences);
            }
        }
    }, [user, setPreferences]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);

export { UserProvider };
