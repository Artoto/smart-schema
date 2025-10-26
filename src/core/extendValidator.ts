import { createValidator } from "./createValidator";

export function extendValidator<
  A extends Record<string, any>,
  B extends Record<string, any>
>(baseValidator: (data: any) => data is A, extendsionTemplate: B) {
  const extendsValidator = (data: unknown): data is A & B => {
    if (!baseValidator(data)) return false;
    const extendsionValidator = createValidator(extendsionTemplate);
    return extendsionValidator(data);
  };

  return extendsValidator;
}
