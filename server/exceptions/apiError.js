class ApiError extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors)
  }

  static Unauthorized(message) {
    return new ApiError(401, message)
  }

  static NotFound(message) {
    return new ApiError(404, message)
  }

  static Conflict(message) {
    return new ApiError(409, message)
  }

}

export default ApiError