/**
 * @overview This file contains the User Model
 */

//import
import mongoose from 'mongoose';
import {Password} from "../../../../utils/password.util";
import jwt,{Secret} from 'jsonwebtoken';
import dotenv from 'dotenv';
import {BadRequestError} from "../../../../errors/bad-request.error";


//access env variables
dotenv.config()

//An interface that describes the properties that is required to create a new user.
interface UserAttrs {
    email: string;
    password: string;
}

//an interface that describes the properties that a user model has
interface UserModel extends mongoose.Model<UserDoc> {
    createNewUser(attrs: UserAttrs): UserDoc;
    generateAuthToken(user:UserDoc): string;
    findByCredentials(email:string,password:string):UserDoc
    validateAuthToken(token:string):any
    removeToken(token:any):any
}

//an interface that describes the properties that a User Document has
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
    tokens: object[];
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
    tokens:[{
        token:{
            type:String
        }
    }]



},{
    timestamps:true,
    toJSON:{ //specifies which information to return publicly
        transform(doc,ret){
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            //delete ret.tokens;
            delete ret.createdAt;
            delete ret.updatedAt;
            delete ret.__v;
        }
    }
})


//Instance methods

/**
 * @method generateAuthToken
 * @description generates and stores a new jwt token
 * @return
 */
userSchema.methods.generateAuthToken = async function(){
    //@ts-ignore
    const user:UserDoc = this;
    const token = jwt.sign({id:user.id,email: user.email},process.env.JWT_SECRET as Secret);
    user.tokens = user.tokens.concat({token:token})
}

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

/**
 * @method generateAuthToken
 * @description generates and JWT authentication token
 * @param {UserDoc} user The user for which the token is to be generated
 * @return {string} JWT auth token
 */
userSchema.statics.generateAuthToken = function(user:UserDoc):string{
    //@ts-ignore
    const token = jwt.sign({id:user.id,email: user.email},process.env.JWT_SECRET as Secret);
    return token
}

/**
 * @method validateAuthToken
 * @description checks if a given toke is valid or not
 * @param token
 * @return object that contains the decoded token or false
 */
userSchema.statics.validateAuthToken = function(token:string){

    try{
        let payload = jwt.verify(
            token,
            process.env.JWT_SECRET!
        );
        return {currentUser: payload}
    }catch(error){
        return {currentUser: null}
    }
}

/**
 *
 */
userSchema.statics.removeToken = async function(token){
    let details = User.validateAuthToken(token)
    let user:any = await User.findOne({_id:details.currentUser.id})
    user.tokens = user.tokens.filter((item:any)=>{
        return item.token !== jwt
    })
    user.save()
}

/**
 * @method findByCredentials
 * @description uses user details to check whether that user exists or not
 * @param {string} email The user's email address
 * @param {string} password The user's password
 * @return  user the user details (if the user exists)
 */
userSchema.statics.findByCredentials = async (email,password)=>{

    //Check if email exists
    const user = await User.findOne({email}).catch((error)=>{
        console.log(error)
    })

    //Throw error if email not found
    if(!user){
        throw new BadRequestError('Invalid credentials')
    }

    //check if passwords match
    const isMatch = await Password.compare(user.password,password).catch((error)=>{
        console.log(error)
    })

    if(!isMatch){
        throw new BadRequestError('Invalid credentials')
    }

    //Return user if found
    return user
}

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
        user.password = await Password.toHash(user.password)
    }
    next()
})

//creating the User model
const User = mongoose.model<UserDoc, UserModel>('User',userSchema);

//export model
export = User

