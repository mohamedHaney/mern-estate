import express from 'express'
import {test} from '../controllers/user.controller.js'
export const router = express.Router()
router.get('/',test)
export default router