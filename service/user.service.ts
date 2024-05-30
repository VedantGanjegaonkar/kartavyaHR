import { UserDocument, UserModel } from "../models/user.model";
import { ValidationError,NotFoundError,AppError,UnauthorizedError } from "../utils/error";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { RecruterModel } from "../models/recruiterDetails.model";
import { UserDetailsModel } from "../models/userDetails.model";

interface createUserParams{

    username:string,
    email:string,
    password:string,
    role:string
        
} 


export class UserService{

    public async findUserByEmail(email: string) {
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw new NotFoundError('Email not found');
        }
        return user;
    }
    
    public async validatePassword(password: string, hashedPassword: string) {
        const isPasswordValid = await bcrypt.compare(password, hashedPassword);
        if (!isPasswordValid) {
            throw new UnauthorizedError('Invalid password');
        }
        return isPasswordValid;
    }


    public async createUser(params: createUserParams) {
        const { username, email, password, role } = params;

        // Check if the email is already registered
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            throw new ValidationError('Email is already registered');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new UserModel({ username, email, password:hashedPassword, role });
        await newUser.save();
        return newUser;
    }
    public async createRecruiter(userId:string,company:string){

        const recruiter = new RecruterModel({userId,company})
        await recruiter.save();
        return recruiter;

    }
    public async createUserDetails(userId:string, qualification:string,branch:string){

        const recruiter = new UserDetailsModel({userId,qualification,branch})
        await recruiter.save();
        return recruiter;

    }

    public async genToken(userId:string,role:string):Promise<string>{
       const token = jwt.sign({userId,role},'secret') 
       return token
    }

    public async getUserId(authHeader:string|undefined):Promise<string>{

        if (!authHeader) {
            throw new NotFoundError("header not found")
           
        }

        const user =   jwt.verify(authHeader, 'secret') as { userId: string; role: string; iat: number; };
        if (!user) {
            throw new NotFoundError("user not found (FORBIDEN)")
        }

        const userID = user.userId
        return userID

    }

    
public async getUserById(userID:string):Promise<UserDocument> {

    const user = await UserModel.findById(userID)

    if(!user){
        throw new NotFoundError("user not found")
    }
    return user

}



}