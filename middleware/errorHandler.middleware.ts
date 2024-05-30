import { Request, Response, NextFunction } from 'express';

import { AppError } from "../utils/error";

export const errorHandler=(err:AppError,req:Request,res:Response,next:NextFunction):void=>{

    try {

        const statusCode=err.statusCode||500
        const message=err.message || "Internaml serval error"

        res.status(statusCode).json({status:"error",statusCode,message})
      
        
    } catch (error) {

        next(error)
        
    }



}