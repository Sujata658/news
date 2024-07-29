import getPreferences from "@/apis/preferences/getPreferences";
import { Config } from "@/types/preferences";
import { ReactNode, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { toast } from "sonner";

interface PreferenceContextType {
    pref: Config | undefined;
    setPref: (pref: Config) => void;
    availablePrefs: Config[];
    setAvailablePrefs: (prefs: Config[]) => void;
}

const defaultPreference: Config = {
    _id: '',
    rows: 4,
    columns: 4,
    ncards: 4,
    rowSpan: [2, 2, 2, 2, 1],
    colSpan: [2, 2, 2, 2, 2],
    categories: ['General', 'Technology', 'Science', 'Sports', 'Entertainment'],
    isDefault: true
};

const PreferenceContext = createContext<PreferenceContextType>({
    pref: undefined,
    setPref: () => {},
    availablePrefs: [],
    setAvailablePrefs: () => {},
});

const PreferenceProvider = ({ children }: { children: ReactNode }) => {
    const [pref, setPref] = useState<Config | undefined>(defaultPreference);
    const [availablePrefs, setAvailablePrefs] = useState<Config[]>([]);

    useEffect(() => {
        getPreferences()
            .then((res) => {
                if (res && res.configs) {
                    console.log('preferences:', res)
                    setAvailablePrefs(res.configs);
                    if (res.configs.length === 0) {
                        setPref(defaultPreference);
                    }
                } else {
                    setAvailablePrefs([]);
                    setPref(defaultPreference);
                }
            })
            .catch(() => {
                console.error("Error fetching preferences:");
                toast.error("Error fetching preferences");
                setAvailablePrefs([]);
                setPref(defaultPreference);
            });
    }, []); 

    useEffect(() => {
        if (availablePrefs.length > 0) {
            const defaultPref = availablePrefs.find(pref => pref.isDefault) || defaultPreference;
            setPref(defaultPref);
        }
    }, [availablePrefs]);

    return (
        <PreferenceContext.Provider value={{ pref, setPref, availablePrefs, setAvailablePrefs }}>
            {children}
        </PreferenceContext.Provider>
    );
};

export const usePreference = () => useContext(PreferenceContext);

export default PreferenceProvider;
