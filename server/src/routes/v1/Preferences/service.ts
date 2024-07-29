import CustomError from '../../../utils/Error';
import { Config } from '../Config/model';
import { handleDefault } from '../Config/repository';
import { getPreferences, createPreferences, deletePreferences, addPreferences } from './repository';


const PreferencesService = {
    async getPreferences(userId: string) {
        const pref = await getPreferences(userId);
        return pref;
    },
    async createPreferences(userId: string, config: Config) {
        return createPreferences(userId, config);
    },
    async deletePreferences(userId: string, configId: string) {
        return deletePreferences(userId, configId);
    },
    async addConfig(userId: string, config: Config) {
        return addPreferences(userId, config);
    },
    async handleDefault(userId: string, defaultId: string) {
        const pref = await getPreferences(userId);
        if (pref) {
            const configIds = pref.configs.map((config: any) => config._id.toString());
            return await handleDefault(defaultId, configIds);
        }
        throw new CustomError('Preferences not found', 404);
    }
};

export default PreferencesService;
