export class InvalidCapacityError implements Error {
  name: string;
  message: string;
  stack?: string | undefined;
  constructor() {
    this.name = 'InvalidCapacityError'
  }
}