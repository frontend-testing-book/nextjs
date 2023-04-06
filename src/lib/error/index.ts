export const errors = {
  400: { message: "Invalid Request Error" },
  401: { message: "Unauthorized Error" },
  404: { message: "Not Found Error" },
  405: { message: "Method Not Allowed Error" },
  500: { message: "Internal Server Error" },
} as const;

export type Errors = typeof errors;
export type ErrorStatus = keyof Errors;
export type ErrorsMessage = {
  [K in ErrorStatus]: Errors[K]["message"];
}[ErrorStatus];
export type Err = { message: ErrorsMessage; status: ErrorStatus };

export class HttpError extends Error {
  message: ErrorsMessage;
  status: ErrorStatus = 500;
  constructor(status: ErrorStatus) {
    super(errors[status].message);
    this.message = errors[status].message;
    this.status = status;
  }
  serialize() {
    return { message: this.message, status: this.status };
  }
}

export class BadRequestError extends HttpError {
  constructor() {
    super(400);
  }
}

export class UnauthorizedError extends HttpError {
  constructor() {
    super(401);
  }
}

export class NotFoundError extends HttpError {
  constructor() {
    super(404);
  }
}

export class MethodNotAllowedError extends HttpError {
  constructor() {
    super(405);
  }
}

export class InternalServerError extends HttpError {
  constructor() {
    super(500);
  }
}
