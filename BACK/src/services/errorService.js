
export const emailAlreadyRegisteredError = () => {
    throw {
        httpStatus: 409, // Conflict
        code: 'EMAIL_ALREADY_REGISTERED',
        message: 'El email ya está registrado',
    };
};

export const invalidCredentialsError = () => {
    throw {
        httpStatus: 401, // Unauthorized
        code: 'INVALID_CREDENTIALS',
        message: 'Credenciales inválidas',
    };
};

export const invalidTokenError = () => {
    throw {
        httpStatus: 401, // Unauthorized
        code: 'INVALID_TOKEN',
        message: 'Token inválido',
    };
};

export const notAuthenticatedError = () => {
    throw {
        httpStatus: 401, // Unauthorized
        code: 'NOT_AUTHENTICATED',
        message: `Debes enviar un token en el header 'Authorization'`,
    };
};

export const notFoundError = (resource) => {
    throw {
        httpStatus: 404, // Not Found
        code: 'RESOURCE_NOT_FOUND',
        message: `El recurso requerido '${resource}' no existe`,
    };
};

export const pendingActivationError = () => {
    throw {
        httpStatus: 403, // Forbidden
        code: 'PENDING_ACTIVATION',
        message:
            'Usuario pendiente de activar. Por favor, verifica tu cuenta antes de continuar.',
    };
};


export const recoveryCodeError = () => {
    throw {
      httpStatus: 401, // Unauthorized
      code: 'INVALID_RECOVERY_CODE',
      message: 'Código de recuperación incorrecto',
    };
  };


export const sendEmailError = () => {
    throw {
        httpStatus: 500, // Internal server error
        code: 'SEND_EMAIL_FAILED',
        message: 'Error al enviar email',
    };
};

export const userAlreadyRegisteredError = () => {
    throw {
        httpStatus: 409, // Conflict
        code: 'USER_ALREADY_REGISTERED',
        message: 'El nombre de usuario ya está registrado',
    };
};

