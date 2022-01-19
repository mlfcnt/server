import { MinError } from "../domain/Errors/MinError";
import { MissingFieldError } from "../domain/Errors/MissingFieldError";

export class Assert {
  static isNotNull(value: any, fieldName: string) {
    if (value === null || value === undefined) {
      throw new MissingFieldError(fieldName);
    }
  }
  static isMin(value: number, minValue: number, fieldName: string) {
    if (value < minValue) {
      throw new MinError(fieldName, minValue);
    }
  }
}
