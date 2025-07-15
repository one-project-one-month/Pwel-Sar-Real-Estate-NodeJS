import { Router } from 'express';
import propertyController from 'modules/property/api/controllers/PropertyController';

const propertyRouter = Router();
propertyRouter.post('/create', propertyController.createProperty);

export default propertyRouter;
