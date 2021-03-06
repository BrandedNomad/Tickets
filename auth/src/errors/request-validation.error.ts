/**
 * @overview This file contains the ValidationError class.
 * Error subclasses are necessary to normalize the responses across different microservices
 */

//used to assign an error type
import {ValidationError} from 'express-validator';
import {CustomError} from "./custom.error";


/**
 * @class RequestValidationError
 * @description extends the base class Error, and is used to normalize the error response
 * for user input validation errors.
 */
export class RequestValidationError extends CustomError {
    //response status code
    statusCode: number = 400;

    /**
     * @constructor
     * @param {ValidationError[]} errors An array of errors generated by the express-validator middleware
     */
    constructor(public errors: ValidationError[]){
        super('Invalid request parameters');

        //Only because we are extending a built in class
        //Ensures that objects created by RequestValidationError gets
        //the Error object in it's prototype chain
        Object.setPrototypeOf(this, RequestValidationError.prototype);

    }

    /**
     * @method serializeErrors
     * @description Formats error messages into a normalized response
     * @return {Object} The normalized error message
     */
    serializeErrors(){
        //contains an array of errors generated by the express-validator middleware
        //formats the errors into the desired format
        //NOTE: the field property is optional and won't be present on all error messages
        return this.errors.map(error=>{
            return {message: error.msg,field:error.param}
        });


    }
}
