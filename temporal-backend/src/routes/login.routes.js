import { Router } from 'express';
import {
    getLogin,
    updateLogin
} from '../controllers/login.controller.js';

const router = Router();

// Routes
router.get("/", getLogin);
router.put("/:id", updateLogin);

export default router;