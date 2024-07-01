// import getPreferences from "@/apis/preferences/getPreferences";
import { Preferences } from "@/types/preferences";
import { ReactNode, useContext,  useState } from "react";
import { createContext } from "react";

interface PreferenceContextType {
    preferences: Preferences;
    setPreferences: (preferences: Preferences) => void;
    // refreshPreferences: () => void;
}

const defaultPreferences: Preferences = {
    user: '',
    categories: ['business', 'sports', 'technology', 'science', 'health'],
    rows: 5,
    columns: 5,
    ncards: 5,
    rowSpan: [3, 3, 2, 1, 1],
    colSpan: [3, 2, 3, 2, 2]
};

const PreferenceContext = createContext<PreferenceContextType>({
    preferences: defaultPreferences,
    setPreferences: () => {},
    // refreshPreferences: () => {}
});

const PreferenceProvider = ({ children }: { children: ReactNode }) => {
    const [preferences, setPreferences] = useState<Preferences>(defaultPreferences);

    // const refreshPreferences = useCallback(() => {
    //     getPreferences()
    //         .then((res) => {
    //             setPreferences(res);
    //         })
    //         .catch((err) => {
    //             console.error("Error fetching preferences:", err);
    //         });
    // }, []);

    // useEffect(() => {
    //     refreshPreferences();
    // }, [refreshPreferences]);

    return (
        // <PreferenceContext.Provider value={{ preferences, setPreferences, refreshPreferences }}>
        <PreferenceContext.Provider value={{ preferences, setPreferences }}>
            {children}
        </PreferenceContext.Provider>
    );
};

export const usePreference = () => useContext(PreferenceContext);

export default PreferenceProvider;
