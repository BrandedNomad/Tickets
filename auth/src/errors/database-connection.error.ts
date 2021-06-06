/**
 * @overview This file contains the ValidationError class.
 * Error subclasses are necessary to normalize the responses across different microservices
 */

//imports
import {CustomError} from "./custom.error";

/**
 * @class DatabaseConnectionError
 * @description extends the base class Error, and is used to normalize the error response
 * for database connection errors
 */
export class DatabaseConnectionError extends CustomError {
    //Response status code
    statusCode: number = 500;

    //The error message
    reason = 'Error connecting to database';

    constructor(){
        super('Error connecting to Database');

        //Only because we are extending a built in class
        //Ensures that objects created by RequestValidationError gets
        //the Error object in it's prototype chain
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);

    }

    /**
     * @method serializeErrors
     * @description Formats error messages into a normalized response
     * @return {Object} The normalized error message
     */
    serializeErrors(){
        return [
            {message:this.reason}
        ]
    }
}
