import express from 'express'
import { registerController , loginController} from '../controllers/Authentication.js'
const authRouter = express.Router()

authRouter.use(express.json())

authRouter.post('/register', registerController )

authRouter.post('/login', loginController )

export default authRouter