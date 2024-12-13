import { Router } from "express";
import { getPersonas, 
  createPersona,
  updatePersona,
  deletePersona,
  getPersonaById
} from "../controllers/personas.controller.js";

const router = Router();

// Routes
router.post("/", createPersona);
router.put("/:id", updatePersona);
router.delete("/:id", deletePersona);
router.get("/", getPersonas);
router.get("/:id", getPersonaById);

export default router;
