
import { Config } from "./model";
import { createConfig, getConfigById, deleteConfig, updateConfig } from "./repository";

const ConfigServices = {
    async create(config: Config, userId: string) {
        return createConfig(config, userId);
    },
    async deleteConfig(userId: string, configId: string) {
        return deleteConfig(userId, configId);
    },
    async getConfigById(configId: string) {
        return getConfigById(configId)
    },
    async updateConfig(userId: string, configId: string, config: Config) {
        return updateConfig(userId, configId, config);
    },
    

};

export default ConfigServices;