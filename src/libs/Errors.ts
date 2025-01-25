export enum HttpCode {
   OK = 200,
    CREATED = 201,
    NOT_MODIFIED = 304,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND= 404,
    INTERNAL_SERVER_ERROR = 500,
}

export enum Message {
    SOMETHING_WENT_WRONG = "Something went wrong!",
    NO_DATA_FOUND = "No data is found!",
    CREATE_FAILED = "create is failed!",
    UPDATE_FAILED = "Update is failed!",

    USED_MEMBER_NICK = "Used memberNick is found!",
    NO_MEMBER_NICK  = "No memberNick is found!",
    BLOCKED_USER = "You have been blocked!, contact restaurant",
    WRONG_PASSWORD = "Wrong password!",
    NOT_FOUND = "NOT_FOUND!",
    USED_NICK_PHONE = "YOU ARE INSERTING ALREADY USED NICK OR PHONE!",
    NOT_AUTENTICATED="you are not authenticated , please log in",
    TOKEN_CREATION_FAILED = "TOKEN_CREATION_FAILED",
}

class Errors extends Error{
    public code: HttpCode;
    public message: Message;

    static standard ={
        code: HttpCode.INTERNAL_SERVER_ERROR,
        message: Message.SOMETHING_WENT_WRONG,
    };


    constructor(statusCode: HttpCode, statusMessage: Message) {
        super();
        this.code = statusCode;
        this.message = statusMessage;
    
    }
}

export default Errors;