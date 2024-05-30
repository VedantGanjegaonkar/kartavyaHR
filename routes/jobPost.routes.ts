
import { Router } from 'express';
import { jobPostController } from '../controller/jobPost.controller';

const jobPostControllero =new jobPostController();

const router = Router();


//jobPost Routes
router.post('/create', jobPostControllero.createJobPost);




export default router;