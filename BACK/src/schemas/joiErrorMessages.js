const joiErrorMessages = {
  "any.required": 'The field "{#key}" is required',
  "string.base": 'The value of "{#key}" must be a string',
  "string.empty": 'The field "{#key}" should not be empty',
  "number.base": 'The value of "{#key}" must be a number',
  "number.max": "The file should not exceed 5 MB",
  "object.base": 'The value of "{#key}" must be an object',
  "any.only": "Only jpeg or png photos are allowed",
  "string.email": 'A valid email must be provided for "{#key}"',
  "string.pattern.base":
    'The password must contain at least one uppercase letter, one lowercase letter, one number, and one punctuation symbol for "{#key}"',
  "string.min": 'The field "{#key}" must have at least {#limit} characters',
  "string.max": 'The field "{#key}" should not exceed {#limit} characters',
  "object.unknown": "Additional fields are not allowed in this object",
};

export default joiErrorMessages;
