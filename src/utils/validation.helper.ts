import { UserRegistrationRequestDto } from "modules/auth/dtos/auth.request.dto";
import { AppError, errorKinds } from "./error-handling";

export const validatePasswordRequirements = (
  password: string
): AppError | null => {
  const trimmed = password.trim();
  const violations: string[] = [];

  if (trimmed.length < 12) {
    violations.push("Password must be at least 12 characters long.");
  }

  if (!/[0-9]/.test(trimmed)) {
    violations.push("Password must include at least one digit.");
  }

  if (!/[!@#$%^&*(),.?":{}|<>_\-+=\[\]\\;/`~]/.test(trimmed)) {
    violations.push("Password must include at least one special character.");
  }

  if (/\s/.test(trimmed)) {
    violations.push("Password must not contain whitespace characters.");
  }

  if (violations.length > 0) {
    return new AppError(errorKinds.validationFailed, violations.join(" "));
  }

  return null;
};

export const validateUserRegistrationCredentials = (
  req: UserRegistrationRequestDto
): AppError | null => {
  return null;
};

export const validateAgentCredentials = (): AppError | null => {
  return null;
};
