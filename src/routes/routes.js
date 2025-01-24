import express from 'express'
import authRouter from './authRoutes.js' 
import userRouter from './userRoutes.js'

const router = express.Router()

router.get('/', (req, res, next)=>{
    return res.status(200).json({ message: "welcome to booking systems backend.... :)"})
})


router.use('/auth', authRouter)
router.use('/user', userRouter)



export default router