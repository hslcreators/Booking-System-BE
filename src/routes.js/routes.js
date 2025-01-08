import express from 'express'
const router = express.Router()

router.get('/', (req, res, next)=>{
    return res.status(200).json({ message: "welcome to booking systems backend.... :)"})
})

const authRouter = require('./authRoutes')
const userRouter = require('./userRoutes')

router.use('/auth', authRouter)
router.use('/user', userRouter)



export default router