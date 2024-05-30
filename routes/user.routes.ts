
import { Router } from 'express';
import { UserController} from '../controller/user.controller';
import { jobPostController } from '../controller/jobPost.controller';

const userController = new UserController();
const jobPostControllero =new jobPostController();

const router = Router();


//user routes
router.post('/signup', userController.createUser);
router.post('/login', userController.login);

//jobPost Routes
router.post('/create', jobPostControllero.createJobPost);








export default router;