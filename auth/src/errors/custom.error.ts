/**
 * @overview this file contains the abstract class Custom Error
 * CustomError was created a an abstract class to ensure that
 * subclasses will implement the serializeError method correctly
 */

/**
 * @class CustomError
 * @extends Error
 * @purpose To provide a method signature for the serializeErrors method
 * which will ensure that all subclasses of Custom class implements this method
 * correctly
 */
export abstract class CustomError extends Error {
    //All subclasses need ot have a status code
    abstract statusCode: number;

    /**
     * @Constructor
     * @param {string} message The message that prints to the terminal whenever
     * an error is thrown
     */
    constructor(message: string){
        super(message)
        //Ensure that all subclasses contains Error in its prototype chain
        Object.setPrototypeOf(this, CustomError.prototype);
    }

    /**
     * @method serializeErrors()
     * @description All subclasses must implement this method
     * @returns {message: string, field?: string}
     */
    abstract serializeErrors(): {message: string; field?: string}[];
}
