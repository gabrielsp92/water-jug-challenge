export class CapacityExceededError implements Error {
  name: string;
  message: string;
  stack?: string | undefined;
  constructor() {
    this.name = 'CapacityExceededError'
  }
}