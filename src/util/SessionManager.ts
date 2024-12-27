import { Request } from "express";
import { AlertType } from "../component/Alert";

type FlashMessage = {
  type: AlertType;
  message: string;
};

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
   * Add to an array of temporary flash messages.
   * @param req - Express request object
   * @param type - Type of the flash message (e.g., 'success', 'error')
   * @param message - The flash message content
   */
  public addFlashMessage(req: Request, type: AlertType, message: string): void {
    let flashMessages = this.get<FlashMessage[]>(req, "flashMessages");
    if (!flashMessages) {
      flashMessages = [];
    }
    flashMessages.push({ type, message });
    this.set(req, "flashMessages", flashMessages);
  }

  /**
   * Get and delete the flash message array.
   * @param req - Express request object
   * @returns The flash message array, or undefined if not found
   */
  public getFlashMessages(req: Request): FlashMessage[] | undefined {
    const flashMessage = this.get<FlashMessage[]>(req, "flashMessages");
    this.delete(req, "flashMessages");
    return flashMessage;
  }
}
