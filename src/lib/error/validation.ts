export class ValidationError extends Error {
  status = 400;
  constructor(message?: string) {
    super(message);
  }
  serialize() {
    return { message: this.message, status: this.status };
  }
}
