import Alert, { AlertType } from "../component/Alert";
import Renderable from "../interface/Renderable";

export class AlertManager {
  private _alerts: Alert[] = [];

  public addAlert(
    message: string,
    type: AlertType,
    dismissible: boolean,
    duration: number | null
  ) {
    const alert = new Alert(message, type, dismissible, duration);
    this._alerts.push(alert);
  }

  public get alerts(): Alert[] {
    return this._alerts;
  }

  public renderAlerts(): string {
    return this._alerts.map((alert) => alert.render()).join("");
  }
}
