/**
 *@overview This file contains all the endpoints for the User route
 */

//imports
//@ts-ignore
import express,{Request,Response} from 'express'
//const User = require('../models/User')
//const ModelV0 = require("../../index.model")
//const auth = require('../../../../middleware/auth')
//const {getPutSignedUrl,getSignedUrl,deleteFiles} = require('../../../../aws')


//Creating a router
//@ts-ignore
const currentuserRouter:IRouterMatcher = express.Router();


currentuserRouter.get('/currentuser',(req:Request, res:Response)=>{
    res.send("success!")
})


//Registers a new user
// router.post("/currentuser", async (req:Request,res:Response)=>{
//     //get user provided details
//     const userProvided = req.body
//
//     //Check if user already exist
//     const doesExist = await ModelV0.User.findByCredentials(userProvided.email,userProvided.password)
//
//     //instantiate new User
//     let user;
//     let token;
//     let signedURL;
//     if(doesExist === false){
//
//         //create user
//         user = await new ModelV0.User(req.body)
//
//         //create a token
//         token = await user.generateAuthToken()
//
//         //request a signed put url from AWS file store
//         signedURL = getPutSignedUrl(req.body.avatar)
//
//         //send results
//         res.status(200).send({user,token,signedURL})
//     } else {
//         res.status(404).send("User not found")
//     }
//
// })
//
// //logs in an existing user
// router.post("/auth",async (req,res)=>{
//     //get user provided details
//     const userProvided =  req.body
//
//     //Check if user exists
//     const user = await ModelV0.User.findByCredentials(userProvided.email,userProvided.password)
//
//     if(user === false){
//         res.status(404).send({error: "User not found"})
//     }else{
//         const token = await user.generateAuthToken()
//         res.status(200).send({user,token})
//     }
//
// })
//
// //Gets a user's profile once logged in
// router.get('/profile',auth,async (req,res)=>{
//
//     //gets the authorized user
//     const user = req.user
//
//     //if user exists
//     if(user !== undefined){
//
//         //requests a signed URL form AWS filestore that will be used to display the user profile image
//         const signedURL = getSignedUrl(user.avatar)
//         res.status(200).send({user,signedURL})
//     }else{
//         res.status(404).send("User not found")
//     }
//
// })
//
// //logs out user
// router.post('/logout', auth, async(req,res)=>{
//
//     try{
//         //removes the session token from users list of tokens
//         req.user.tokens = req.user.tokens.filter((token)=>{
//             return token.token !== req.token
//         })
//
//         await req.user.save()
//
//         res.status(200).send("successfully logged out")
//     }catch(error){
//         res.status(500).send("Unable to logout.")
//     }
// })
//
// //deletes user
// router.delete('/delete',auth,async(req,res)=>{
//     try{
//
//         //Delete profile image from AWS file store
//         deleteFiles(req.user.avatar);
//
//         //Deletes user info from User database
//         const deletedUser = await User.findByIdAndDelete(req.user._id)
//
//
//         if(!deletedUser){
//             res.status(404).send("Unable to delete account")
//         }
//
//         res.status(200).send(deletedUser)
//
//     }catch(error){
//         res.status(500).send("Server Error")
//     }
// })

//exports
export = currentuserRouter;
