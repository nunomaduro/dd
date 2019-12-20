export type Exitable = {
  /**
   * Throwns an error making the process terminate.
   */
  readonly exit: () => void;
};
