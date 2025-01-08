import express from 'express'
import { registerController , loginController} from '../controllers/Authentication'
const router = express.Router()
router.use(express.json())


router.post('/register', registerController )

router.post('/login', loginController)