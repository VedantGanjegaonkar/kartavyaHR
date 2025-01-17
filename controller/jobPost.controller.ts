import { Request, Response, NextFunction} from 'express';
import {JobPost,IJobPost} from '../models/jobPost.model';
import { JobPostServices } from '../service/jobPost.service';

export class jobPostController{

    private jobPostServices:JobPostServices;

    constructor(){
        this.jobPostServices=new JobPostServices()

        this.createJobPost=this.createJobPost.bind(this)
        this.deleteJobPost=this.deleteJobPost.bind(this)
    }
    
public async createJobPost(req: Request, res: Response,next:NextFunction): Promise<void>{
    try {
        const jobPostData = req.body;

       const newJobPost= await this.jobPostServices.createJobPost(jobPostData)
      
  
      res.status(201).json({ message: 'Job post created successfully', jobPost: newJobPost });
    } catch (error) {
      next(error)
    }
  };

public async deleteJobPost(req: Request, res: Response, next:NextFunction):Promise<void>{
    try {

        const jobPostId=req.params.id

        await this.jobPostServices.deleteJobPost(jobPostId)
        
        res.status(200).json({ message: 'Job post deleted successfully' });
        
    } catch (error) {
        next(error)
    }
}
}