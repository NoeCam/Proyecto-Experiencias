export const emailAlreadyRegisteredError = () => {
  throw {
    httpStatus: 409, // Conflict
    code: "EMAIL_ALREADY_REGISTERED",
    message: "Email already registered",
  };
};

export const invalidCredentialsError = () => {
  throw {
    httpStatus: 401, // Unauthorized
    code: "INVALID_CREDENTIALS",
    message: "Invalid credentials",
  };
};

export const invalidTokenError = () => {
  throw {
    httpStatus: 401, // Unauthorized
    code: "INVALID_TOKEN",
    message: "Invalid token",
  };
};

export const notAuthenticatedError = () => {
  throw {
    httpStatus: 401, // Unauthorized
    code: "NOT_AUTHENTICATED",
    message: `You must send a token in the 'Authorization' header`,
  };
};

export const notFoundError = (resource) => {
  throw {
    httpStatus: 404, // Not Found
    code: "RESOURCE_NOT_FOUND",
    message: `The required resource '${resource}' does not exist`,
  };
};

export const pendingActivationError = () => {
  throw {
    httpStatus: 404, // Forbidden
    code: "STATUS CODE",
    message: "User not found",
  };
};

export const recoveryCodeError = () => {
  throw {
    httpStatus: 401, // Unauthorized
    code: "INVALID_RECOVERY_CODE",
    message: "Wrong recovery code",
  };
};

export const sendEmailError = () => {
  throw {
    httpStatus: 500, // Internal server error
    code: "SEND_EMAIL_FAILED",
    message: "Error sending email",
  };
};

export const userAlreadyRegisteredError = () => {
  throw {
    httpStatus: 409, // Conflict
    code: "USER_ALREADY_REGISTERED",
    message: "The username is already registered",
  };
};

export const cannotVoteWithoutParticipationError = () => {
  throw {
    httpStatus: 403, // Forbidden
    code: "CANNOT_VOTE_OWN_ENTRY",
    message: "You can't vote for an experience you haven't enjoyed,",
  };
};

export const voteAlreadyExistsError = () => {
  throw {
    httpStatus: 409, // Conflict
    code: "VOTE_ALREADY_EXISTS",
    message: "You cannot vote for the same experience more than once,",
  };
};

export const saveImageError = () => {
  throw {
    httpStatus: 500, // Server error
    code: "SAVE_IMAGE_ERROR",
    message: "Error saving an image.",
  };
};

export const deleteImageError = () => {
  throw {
    httpStatus: 500, // Server error
    code: "DELETE_IMAGE_ERROR",
    message: "Error deleting an image.",
  };
};

export const validationError = (message) => {
  throw {
    httpStatus: 400, // Bad Request
    code: "MISSING_FIELDS",
    message: message,
  };
};
