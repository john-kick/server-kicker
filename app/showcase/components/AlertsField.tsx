import Alert, { AlertType } from "../../components/Alert";

const alertTypes: { type: AlertType; message: string }[] = [
  { type: "info", message: "Info" },
  { type: "success", message: "Success" },
  { type: "warning", message: "Warning" },
  { type: "error", message: "Error" }
];

export default function AlertsField() {
  return (
    <>
      <h2>Alerts</h2>
      <div>
        {alertTypes.map(({ type, message }) => (
          <Alert key={type} type={type} dismissible>
            {message}
          </Alert>
        ))}
      </div>
    </>
  );
}
