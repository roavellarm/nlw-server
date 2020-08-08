import Router from 'express'
import AuthController from './controllers/AuthController'
import ClassesController from './controllers/ClassesController'
import ConnectionsController from './controllers/ConnectionsController'

const routes = Router()

routes.post('/login', AuthController.login)
routes.post('/register', AuthController.register)

routes.get('/classes', ClassesController.index)
routes.post('/classes', ClassesController.create)

routes.get('/connections', ConnectionsController.index)
routes.post('/connections', ConnectionsController.create)

export default routes
