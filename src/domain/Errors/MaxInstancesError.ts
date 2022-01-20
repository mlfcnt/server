export class MaxInstancesError extends Error {
  constructor(className: string, maxInstances: number) {
    super(`Maximum current ${className} reached (${maxInstances})`);
  }
}
