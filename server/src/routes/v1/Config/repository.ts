import { getPreferences } from "../Preferences/repository";
import PreferencesServices from "../Preferences/service";
import { Config, ConfigModel } from "./model";

export const createConfig = async (config: Config, userId: string) => {
    const newConfig = new ConfigModel(config);
    await newConfig.save();
    const res = await PreferencesServices.addConfig(userId, newConfig);
    if(config.isDefault === true) {
        const pref = await getPreferences(userId);
        const allConfigs = pref?.configs || [];
        await handleDefault(newConfig._id.toString(), allConfigs.map(config => config._id.toString()));
    }
    return res;
};

export const getConfigById = async (configId: string) => {
    return ConfigModel.findById(configId).exec();
}

export const updateConfig = async (userId: string, configId: string, config: Config) => {
    const updatedConfig = await ConfigModel.findOneAndUpdate({ _id: configId, user: userId }, config, { new: true }).exec();
    return updatedConfig;
}

export const deleteConfig = async (userId: string, configId: string) => {
    const config = await ConfigModel.deleteOne({ _id: configId, user: userId }).exec();
    await PreferencesServices.deletePreferences(userId, configId);
    return config;
}
export const handleDefault = async (defaultId: string, configs: string[]) => {
    try {
        await ConfigModel.updateMany(
            { _id: { $in: configs }, isDefault: true },
            { $set: { isDefault: false } }
        );

        await ConfigModel.updateOne(
            { _id: defaultId },
            { $set: { isDefault: true } }
        );

        return { message: 'Preferences updated successfully' };
    } catch (error) {
        throw new Error(`Failed to update preferences`);
    }
};