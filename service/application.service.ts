import { IJobPost, JobPost } from "../models/jobPost.model";
import { NotFoundError } from "../utils/error";
import { UserService } from "./user.service";  
import {Types} from "mongoose"

export class ApplicationService{

    private userService:UserService;

    constructor(){
        this.userService = new UserService();
    }

    public async findJobPostById(Id:string):Promise<IJobPost>{

        const jobPost= await JobPost.findById(Id)
        if(!jobPost){
            throw new NotFoundError("job post not found")
        }
        return jobPost

    }

    
    public async applyForJobPost(userId:string,jobPostid:string){

    const JobPost = this.findJobPostById(jobPostid);

    // await JobPost.applications
    


        
    }
}