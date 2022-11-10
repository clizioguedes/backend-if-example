import { Router } from "express";

import { UserController } from "./controllers/UserController";


const router = Router()

const userController = new UserController()

//usuarios
router.post('/user', userController.handle)
router.get('/users', userController.all)
router.get('/user/:id', userController.user)
router.delete('/user/:id', userController.delete)
router.patch('/user/:id', userController.update)


export default router
