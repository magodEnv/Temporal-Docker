import { Router } from "express";
import {
    saveMainProyectos,
    getMainProyectos,
    updateMainProyectos,
    deleteMainProyectos
} from "../controllers/mainProyectos.controller.js";

const router = Router();

// Routes


router.get("/", getMainProyectos);
router.post("/", saveMainProyectos);
router.put("/:id", updateMainProyectos);
router.delete("/:id", deleteMainProyectos);

export default router;