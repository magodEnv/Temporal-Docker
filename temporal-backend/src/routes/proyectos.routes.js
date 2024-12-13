import { Router } from 'express';
import { getProyectos, 
  createProyecto,
  updateProyecto,
  deleteProyecto,
  getProyectoById,
  getPersonasByProyectoId,
  createPersonaByProyectoId,
  deletePersonasByProyectoId,
  updatePersonasByProyectoId,
} from '../controllers/proyectos.controller.js';

const router = Router();

// Routes
router.post('/', createProyecto);
router.put('/:id', updateProyecto);
router.delete('/:id', deleteProyecto);
router.get('/', getProyectos);
router.get('/:id', getProyectoById);

router.get('/:proyectoId/personas', getPersonasByProyectoId);
router.post('/:proyectoId/personas', createPersonaByProyectoId);
router.delete('/:proyectoId/personas', deletePersonasByProyectoId);
router.put('/:proyectoId/personas', updatePersonasByProyectoId);
/*


*/

export default router;