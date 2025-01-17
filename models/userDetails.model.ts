import { Document, Schema, model,models } from 'mongoose';
import{UserDocument} from "./user.model"
// Define the user interface
interface IUserDetails extends Document {
   
    userId: UserDocument['_id'];
    qualification:string;
    branch:string;
   
}

// Define the user schema
const userSchema = new Schema<IUserDetails>({
   
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    qualification:{ type: String, required: true },
    branch:{ type: String, required: true }
    
});

// Create the user model
const UserDetailsModel = models.UserDetails || model<IUserDetails>('UserDetailsModel', userSchema);

export {UserDetailsModel,IUserDetails} ;