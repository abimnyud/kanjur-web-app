export class NotFoundError extends Error {
    HTTPErrorCode: number;

    constructor(message: string, HTTPErrorCode: number = 404) {
        super(message);
        this.HTTPErrorCode = HTTPErrorCode;
    }
}

export class SystemError extends Error {
    HTTPErrorCode: number;

    constructor(message: string, HTTPErrorCode: number = 500) {
        super(message);
        this.HTTPErrorCode = HTTPErrorCode;
    }
}

export class UserRequestError extends Error {
    HTTPErrorCode: number;

    constructor(message: string, HTTPErrorCode: number = 400) {
        super(message);
        this.HTTPErrorCode = HTTPErrorCode;
    }
}

export class UnauthorizedError extends Error {
    HTTPErrorCode: number;

    constructor(message: string, HTTPErrorCode: number = 401) {
        super(message);
        this.HTTPErrorCode = HTTPErrorCode;
    }
}

export class Exists extends Error {
    HTTPErrorCode: number;

    constructor(message: string, HTTPErrorCode: number = 200) {
        super(message);
        this.HTTPErrorCode = HTTPErrorCode;
    }
}
