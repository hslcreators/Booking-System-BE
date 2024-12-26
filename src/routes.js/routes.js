import express from 'express'
const router = express.Router()

router.get('/', (req, res, next)=>{
    return res.status(200).json({ message: "welcome to booking systems backend.... :)"})
})




export default router