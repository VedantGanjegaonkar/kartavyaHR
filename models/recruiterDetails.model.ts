import{model,Schema,models,Document} from "mongoose"
import{UserDocument} from "./user.model"

export interface Irecruiter extends Document{
    userId: UserDocument['_id'];
    company:string
    
}

const recruiterSchema = new Schema<Irecruiter>({

    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    company:{ type: String, required: true }

})

const RecruterModel = models.RecruiterDetails  || model<Irecruiter>('recruiter', recruiterSchema);
export {RecruterModel} ;