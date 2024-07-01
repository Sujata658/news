import { getPreferences, createPreferences, deletePreferences } from './repository';
import { PreferencesProps } from './model';

const PreferencesService = {
    async getPreferences(userId: { _id: string }) {
        return getPreferences(userId._id);
    },
    async createPreferences(userId: { _id: string }, preferences: PreferencesProps) {
        return createPreferences(userId._id, preferences);
    },
    async deletePreferences(userId: { _id: string }) {
        return deletePreferences(userId._id);
    }
}

export default PreferencesService;
