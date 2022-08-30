export class NoSolutionError implements Error {
  name: string;
  message: string;
  stack?: string | undefined;
  constructor() {
    this.name = 'NoSolutionError'
    this.message = 'No Solution'
  }
}