import { Request, Response,NextFunction } from 'express';
import { UserService } from '../service/user.service';
import{errorHandler} from "../middleware/errorHandler.middleware"

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
      
        this.login = this.login.bind(this);
        this.createUser = this.createUser.bind(this);
    }

    public async login(req: Request, res: Response, next:NextFunction): Promise<void> {
        try {
           const {email,password} =req.body

          const user = await this.userService.findUserByEmail(email)

          await this.userService.validatePassword(password,user.password)

          const token = await this.userService.genToken(user._id.toString(),user.role)

          res.status(200).json({message: 'Login successful', token })



        } catch (err: any) {

            next(err)
           
        }
    }

    public async createUser(req: Request, res: Response,next:NextFunction): Promise<void> {
        try {
            const { username, email, password, role,company,qualification,branch } = req.body;

            // Create the user object
            const createUserParams = { username, email, password, role };

            // Call the service to create a user
            const newUser = await this.userService.createUser(createUserParams);

            if(role=="recruiter"){

                await this.userService.createRecruiter(newUser._id.toString(),company)
            }else if(role=="user") {
              
                
                await this.userService.createUserDetails(newUser._id.toString(),qualification,branch);
            }


            res.status(201).json({ message: 'User created successfully', user: newUser });
        } catch (err: any) {
            next(err)
        }
    }
}