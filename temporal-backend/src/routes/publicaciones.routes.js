import { Router } from 'express';
import { getPublicaciones, 
  createPublicacion,
  updatePublicacion,
  deletePublicacion,
  getPublicacionById,
  getPersonasByPublicacionId,
  //postPublicacion
} from '../controllers/publicaciones.controller.js';

const router = Router();

// Routes
router.post('/', createPublicacion);
//router.post('/', postPublicacion);
router.put('/:id', updatePublicacion);
router.delete('/:id', deletePublicacion);
//router.get('/', getPublicaciones);
router.get('/', getPublicaciones);
router.get('/:id', getPublicacionById);
//router.get('/:publicacionId/personas', getPersonasByPublicacionId);

export default router;