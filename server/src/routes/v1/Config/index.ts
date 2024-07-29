import { Router } from "express";
import requireUser from "../../../middleware/requireUser";
import ConfigController from "./controller";

const ConfigRouter = Router();

ConfigRouter.post('/', requireUser, ConfigController.createConfig);
ConfigRouter.patch('/', requireUser, ConfigController.updateConfig);
ConfigRouter.delete('/', requireUser, ConfigController.deleteConfig);
// ConfigRouter.post('/handleStatus', requireUser, ConfigController.handleStatus);


export default ConfigRouter;