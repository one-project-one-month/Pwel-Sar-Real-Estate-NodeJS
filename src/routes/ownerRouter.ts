import { Router } from 'express';
import ownerController from 'modules/user/api/controllers/OwnerController';
import passport from 'passport';

const ownerRoute = Router();

ownerRoute.get(
  '/',
  passport.authenticate('access-jwt', { session: false }),
  ownerController.getAll
);
ownerRoute.get(
  '/:id',
  passport.authenticate('access-jwt', { session: false }),
  ownerController.findById
);
ownerRoute.post(
  '/create',
  passport.authenticate('access-jwt', { session: false }),
  ownerController.create
);

export default ownerRoute;
