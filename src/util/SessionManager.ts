import { Request } from "express";

export default class SessionManager {
  private static instance: SessionManager;
  private errors: string[] = [];

  // Singleton pattern to ensure a single instance
  private constructor() {}

  public static getInstance(): SessionManager {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager();
    }
    return SessionManager.instance;
  }

  /**
   * Set a value in the session.
   * @param req - Express request object
   * @param key - Key for the session data
   * @param value - Value to store in the session
   */
  public set(req: Request, key: string, value: any): void {
    if (!req.session) {
      throw new Error(
        "Session is not initialized. Ensure session middleware is configured."
      );
    }
    req.session[key] = value;
  }

  /**
   * Get a value from the session.
   * @param req - Express request object
   * @param key - Key for the session data
   * @returns The value associated with the key, or undefined if not found
   */
  public get<T>(req: Request, key: string): T | undefined {
    if (!req.session) {
      throw new Error(
        "Session is not initialized. Ensure session middleware is configured."
      );
    }
    return req.session[key] as T;
  }

  /**
   * Delete a value from the session.
   * @param req - Express request object
   * @param key - Key for the session data
   */
  public delete(req: Request, key: string): void {
    if (!req.session) {
      throw new Error(
        "Session is not initialized. Ensure session middleware is configured."
      );
    }
    delete req.session[key];
  }

  /**
   * Clear all session data.
   * @param req - Express request object
   */
  public clear(req: Request): void {
    if (!req.session) {
      throw new Error(
        "Session is not initialized. Ensure session middleware is configured."
      );
    }
    req.session.destroy((err) => {
      if (err) {
        console.error("Error clearing session:", err);
      }
    });
  }

  /**
   * Set a temporary flash message.
   * @param req - Express request object
   * @param type - Type of the flash message (e.g., 'success', 'error')
   * @param message - The message text
   */
  public setFlashMessage(req: Request, type: string, message: string): void {
    this.set(req, "flashMessage", { type, message });
  }

  /**
   * Get and delete the flash message.
   * @param req - Express request object
   * @returns The flash message object, or undefined if not found
   */
  public getFlashMessage(req: Request): string | undefined {
    const flashMessage = this.get<string>(req, "flashMessage");
    this.delete(req, "flashMessage");
    return flashMessage;
  }

  /**
   * Add an error message to the session.
   * @param req - Express request object
   * @param message - The error message to add
   */
  public addError(req: Request, message: string): void {
    let errors = this.get<string[]>(req, "errors");
    if (!errors) {
      errors = [];
    }
    errors.push(message);
    this.set(req, "errors", errors);
  }

  /**
   * Retrieve and remove all error messages from the session.
   * @param req - Express request object
   * @returns An array of error messages, or undefined if no errors are found
   */
  public getErrors(req: Request): string[] | undefined {
    const errors = this.get<string[]>(req, "errors");
    this.delete(req, "errors");
    return errors;
  }
}
