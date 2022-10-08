export default interface BusinessRule {
  isBroken(): Promise<boolean>;

  errorMessage(): string;
}
