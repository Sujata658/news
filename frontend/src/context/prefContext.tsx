import getPreferences from "@/apis/preferences/getPreferences";
import { Preference } from "@/types/preferences";
import { ReactNode, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { toast } from "sonner";

interface PreferenceContextType {
    pref: Preference;
    setPref: (pref: Preference) => void;
    availablePrefs: Preference[];
    setAvailablePrefs: (prefs: Preference[]) => void;
}

const defaultPreference: Preference = {
    type: 'default',
    rows: 5,
    columns: 5,
    ncards: 5,
    rowSpan: [3, 3, 2, 1, 1],
    colSpan: [3, 2, 3, 2, 2],
    categories: ['General', 'Technology', 'Science', 'Sports', 'Entertainment'],
};

const PreferenceContext = createContext<PreferenceContextType>({
    pref: defaultPreference,
    setPref: () => {},
    availablePrefs: [],
    setAvailablePrefs: () => {},
});

const PreferenceProvider = ({ children }: { children: ReactNode }) => {
    const [pref, setPref] = useState<Preference>(defaultPreference);
    const [availablePrefs, setAvailablePrefs] = useState<Preference[]>([]);

    useEffect(() => {
        getPreferences()
            .then((res) => {
                if (res && res.preferences) {
                    setAvailablePrefs(res.preferences); 
                } else {
                    
                    setAvailablePrefs([]);
                }
            })
            .catch(() => {
                console.error("Error fetching preferences:");
                toast.error("Error fetching preferences");
            });
    }, []); 

    
    useEffect(() => {
        const defaultPref = availablePrefs.find(pref => pref.type === 'default') || defaultPreference;
        setPref(defaultPref);
    }, [availablePrefs]);

    return (
        <PreferenceContext.Provider value={{ pref, setPref, availablePrefs, setAvailablePrefs }}>
            {children}
        </PreferenceContext.Provider>
    );
};

export const usePreference = () => useContext(PreferenceContext);

export default PreferenceProvider;
