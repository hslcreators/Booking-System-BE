import express from 'express'
import router from './routes.js/routes.js'
const app = express()


app.use("/api/v1", router)



export default app