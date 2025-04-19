exports.constants = {
  // HTTP status codes
  HTTP_STATUS_OK: 200,
  HTTP_STATUS_CREATED: 201,
  HTTP_STATUS_NO_CONTENT: 204,
  HTTP_STATUS_BAD_REQUEST: 400,
  HTTP_STATUS_UNAUTHORIZED: 401,
  HTTP_STATUS_FORBIDDEN: 403,
  HTTP_STATUS_NOT_FOUND: 404,
  HTTP_STATUS_INTERNAL_SERVER_ERROR: 500,

  // Common error messages
  ERROR_MESSAGES: {
    VALIDATION_ERROR: "Validation error",
    NOT_FOUND: "Resource not found",
    UNAUTHORIZED: "Unauthorized access",
    FORBIDDEN: "Forbidden access",
    INTERNAL_SERVER_ERROR: "Internal server error",
  },
  // Common success messages
  SUCCESS_MESSAGES: {
    RESOURCE_CREATED: "Resource created successfully",
    RESOURCE_UPDATED: "Resource updated successfully",
    RESOURCE_DELETED: "Resource deleted successfully",
    OPERATION_SUCCESSFUL: "Operation completed successfully",
  },
  // Common validation messages
  VALIDATION_MESSAGES: {
    REQUIRED_FIELD: "This field is required",
    INVALID_EMAIL: "Invalid email address",
    MIN_LENGTH: (field, length) => `${field} must be at least ${length} characters long`,
    MAX_LENGTH: (field, length) => `${field} must not exceed ${length} characters`,
  },
  // Common database messages
  DB_MESSAGES: {
    CONNECTION_SUCCESS: "Database connection successful",
    CONNECTION_ERROR: "Database connection error",
    QUERY_SUCCESS: "Query executed successfully",
    QUERY_ERROR: "Query execution error",
  },
  // Common authentication messages
  AUTH_MESSAGES: {
    LOGIN_SUCCESS: "Login successful",
    LOGOUT_SUCCESS: "Logout successful",
    REGISTRATION_SUCCESS: "Registration successful",
    PASSWORD_RESET_SUCCESS: "Password reset successful",
  },
}