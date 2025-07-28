import express from 'express';
import {
    getAllExperiences,
    createExperience,
    updateExperience,
    deleteExperience,
} from '../controller/experienceController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

// Individual routers for each operation
router.post('/add', isAuthenticated, createExperience);
router.put('/update/:id', isAuthenticated, updateExperience);
router.delete('/delete/:id', isAuthenticated, deleteExperience);
router.get('/getall', getAllExperiences);

export default router;
