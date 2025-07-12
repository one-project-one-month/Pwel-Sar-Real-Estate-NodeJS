import { Router } from 'express';
import ownerController from 'modules/user/api/controllers/PropertyController';

const ownerRoute = Router();

ownerRoute.get('/', ownerController.getAll);
ownerRoute.get('/:id', ownerController.findById);
ownerRoute.post(
  '/create',
  //   passport.authenticate('access-jwt', { session: false }),
  ownerController.create
);

export default ownerRoute;
