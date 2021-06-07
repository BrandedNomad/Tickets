/**
 * @overview This file contains the BadRequestError class.
 * Error subclasses are necessary to normalize the responses across different microservices
 */

//imports
import {CustomError} from "./custom.error";

/**
 * @class BAdRequestError
 * @description extends the base class Error, and is used to normalize the error response
 * for bad request errors
 */
export class BadRequestError extends CustomError {
    //Response status code
    statusCode: number = 400;

    constructor(public message:string){
        super(message);

        //Only because we are extending a built in class
        //Ensures that objects created by RequestValidationError gets
        //the Error object in it's prototype chain
        Object.setPrototypeOf(this, BadRequestError.prototype);

    }

    /**
     * @method serializeErrors
     * @description Formats error messages into a normalized response
     * @return {Object} The normalized error message
     */
    serializeErrors(){
        return [
            {message:this.message}
        ]
    }
}
