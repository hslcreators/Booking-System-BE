import express from 'express'
import { createSpaceController, deleteSpaceController, fetchSpaceController } from '../controllers/SpaceController.js'
import { authenticateUserwebtoken, isAdmin } from '../middleware/authenticateToken.js'
const spaceRouter = express.Router()

spaceRouter.get('/', fetchSpaceController)
spaceRouter.post('/', authenticateUserwebtoken, isAdmin, createSpaceController)
spaceRouter.delete('/:id', authenticateUserwebtoken, isAdmin, deleteSpaceController)

export default spaceRouter