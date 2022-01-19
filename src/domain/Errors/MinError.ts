export class MinError extends Error {
  constructor(fieldName: string, minValue: number) {
    super(`${fieldName} must be at least ${minValue}`);
  }
}
