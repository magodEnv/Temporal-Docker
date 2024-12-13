import { Router } from "express";
import { getImagenes, 
  saveImagen,
  updateImagen,
  deleteImagen,
  getImagenById
} from "../controllers/imagen.controller.js";

const router = Router();

// Routes
router.post("/", saveImagen);
router.put("/:id", updateImagen);
router.delete("/:id", deleteImagen);
router.get("/", getImagenes);
router.get("/:id", getImagenById);

export default router;