/**
 * @overview This file contains the User Model
 */

//import
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import {Password} from "../../../../utils/password.util";

//An interface that describes the properties that is required to create a new user.
interface UserAttrs {
    email: string;
    password: string;
}

//an interface that describes the properties that a user model has
interface UserModel extends mongoose.Model<UserDoc> {
    createNewUser(attrs: UserAttrs): UserDoc;
}

//an interface that describes the properties that a User Document has
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
    updatedAt: string;
    createdAt: string;
}

//Creating the User Schema
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
        min:4
    },
    tokens:{

    }
},{timestamps:true})

//Instance methods

//Object methods
/**
 * @method createNewUser
 * @description Used instead of the new User() method to create a new User.
 * This is done to ensure that Typescript can type-check the arguments passed into
 * the function, as TS doesn't work well with the new User function
 * @param {UserAttrs} attrs An object that contains an email and password
 * @return {User}
 */
userSchema.statics.createNewUser = (attrs: UserAttrs) =>{
    return new User(attrs);
};

//MIDDLEWARE

/**
 * @description Whenever a new user is created or a user password is updated, this
 * function hashes the password before it is saved in the database, therefore
 * ensuring that plain text passwords are never saved
 */
userSchema.pre('save', async function(next){
    //@ts-ignore
    const user:UserDoc = this
    if(user.isModified('password')){
        //user.password = await bcrypt.hash(user.password,8)
        user.password = await Password.toHash(user.password)
    }
    next()
})

//creating the User model
const User = mongoose.model<UserDoc, UserModel>('User',userSchema);

//export model
export = User

