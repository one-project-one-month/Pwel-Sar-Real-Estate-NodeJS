import { Router } from "express";
import ownerController from "modules/user/api/controllers/PropertyController";
import passport from "passport";


const ownerRoute = Router()

ownerRoute.get('/', ownerController.getAll)
ownerRoute.get('/:id', ownerController.findById)
ownerRoute.post('/create', passport.authenticate('access-jwt', { session: false }), ownerController.create)
ownerRoute.patch('/:id/approve', ownerController.approve)
ownerRoute.patch('/:id/reject', ownerController.reject)
ownerRoute.delete('/delete/:id', ownerController.deleteById)
export default ownerRoute