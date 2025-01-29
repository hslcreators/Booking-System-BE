import express from 'express'
import authRouter from './authRoutes.js' 
import userRouter from './userRoutes.js'
import spaceRouter from './spaceRoutes.js'

const router = express.Router()
router.use(express.json())

router.get('/', (req, res, next)=>{
    return res.status(200).json({ message: "welcome to booking systems backend.... :)"})
})


router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/spaces', spaceRouter)


export default router