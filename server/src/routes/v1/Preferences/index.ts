import { Router } from "express";
import PreferencesController from "./controller";
import requireUser from "../../../middleware/requireUser";

const PreferencesRouter = Router();

PreferencesRouter.get('/',requireUser, PreferencesController.getPreferences);
PreferencesRouter.post('/', requireUser, PreferencesController.createPreferences);
PreferencesRouter.delete('/', requireUser, PreferencesController.deletePreferences);

export default PreferencesRouter;