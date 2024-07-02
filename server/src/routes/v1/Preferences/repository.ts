import { Preference, PreferenceModel } from "./model";

export const getPreferences = async (userId: string) => {
    return PreferenceModel.findOne({ user: userId }).exec();
};

export const createPreferences = async (userId: string, preferences: Preference) => {
    const preference = new PreferenceModel({ user: userId, preferences });
    return preference.save();
};

export const deletePreferences = async (userId: string) => {
    return PreferenceModel.deleteOne({ user: userId }).exec();
};

export const addPreferences = async (userId: string, preferences: Preference) => {
    return PreferenceModel.updateOne({ user: userId }, { $push: { preferences } }).exec();
}
