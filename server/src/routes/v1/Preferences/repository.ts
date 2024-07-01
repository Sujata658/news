import { PreferenceModel, PreferencesProps } from "./model";

export const getPreferences = async (userId: string) => {
    return PreferenceModel.find({ user: userId }).exec();
}

export const createPreferences = async (userId: string, preferences: PreferencesProps) => {
    const preference = new PreferenceModel({
        user: userId,
        categories: preferences.categories,
        rows: preferences.rows,
        columns: preferences.columns,
        ncards: preferences.ncards,
        rowSpan: preferences.rowSpan,
        colSpan: preferences.colSpan
    });
    return preference.save();
}

export const deletePreferences = async (userId: string) => {
    return PreferenceModel.deleteOne({ user: userId }).exec();
}