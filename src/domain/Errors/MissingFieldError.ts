export class MissingFieldError extends Error {
  constructor(fieldName: string) {
    super(`${fieldName} is required`);
  }
}
