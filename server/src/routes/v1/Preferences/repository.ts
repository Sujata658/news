import { Config } from "../Config/model";
import { PreferencesModel } from "./model";


export const getPreferences = async (userId: string) => {
    return PreferencesModel.findOne({ user: userId }).populate('configs').exec();
};

export const createPreferences = async (userId: string, config: Config) => {
    const preference = new PreferencesModel({ user: userId, config });
    return preference.save();
};

export const deletePreferences = async (userId: string, configId: string) => {
    return PreferencesModel.updateOne({ user: userId }, { $pull: {
        configs: configId
    } }).exec();
};

export const addPreferences = async (userId: string, config: Config) => {
    const res = await PreferencesModel.updateOne({ user: userId }, { $push: { configs: config } });
    // return PreferencesModel.updateOne({ user: userId }, { $push: { config } }).exec();
    return res;
}
