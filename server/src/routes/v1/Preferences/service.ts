import { getPreferences, createPreferences, deletePreferences, addPreferences } from './repository';
import { Preference } from './model';

const PreferencesService = {
    async getPreferences(userId: string) {
        const pref = await getPreferences(userId);
        return pref;
    },
    async createPreferences(userId: string, preferences: Preference) {
        const pref = await getPreferences(userId);
        if (pref) {
            return addPreferences(userId, preferences);
            
        }else{
            return createPreferences(userId, preferences);
        }
    },
    async deletePreferences(userId: string) {
        return deletePreferences(userId);
    }
};

export default PreferencesService;
