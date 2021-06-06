/**
 * @overview This file contains the ValidationError class.
 * Error subclasses are necessary to normalize the responses across different microservices
 */

/**
 * @class DatabaseConnectionError
 * @description extends the base class Error, and is used to normalize the error response
 * for database connection errors
 */
export class DatabaseConnectionError extends Error {

    //The error message
    reason = 'Error connecting to database';

    constructor(){
        super();

        //Only because we are extending a built in class
        //Ensures that objects created by RequestValidationError gets
        //the Error object in it's prototype chain
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);

    }
}
