import { Router } from "express";
import {
    getLandingInfo,
    updateLandingInfo
} from "../controllers/landingInfo.controller.js";

const router = Router();

// Routes

router.get("/", getLandingInfo);
router.put("/", updateLandingInfo);

export default router;