import { ValidationError, validate } from "class-validator";

export const AppValidationError = async (
  params: any
): Promise<ValidationError[] | false> => {
  const er = await validate(params, {
    ValidationError: { target: true },
  });

  if (er.length) {
    return er;
  }
  return false;
};
