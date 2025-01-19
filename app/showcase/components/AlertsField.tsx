import Alert from "@/components/Alert";
import { AlertMessage } from "@/provider/AlertProvider";
import { useState } from "react";

const alertTypes: AlertMessage[] = [
  {
    type: "info",
    message: "Info",
    id: "1"
  },
  {
    type: "success",
    message: "Success",
    id: "2"
  },
  {
    type: "warning",
    message: "Warning",
    id: "3"
  },
  {
    type: "error",
    message: "Error",
    id: "4"
  }
];

export default function AlertsField() {
  const [alerts, setAlerts] = useState([...alertTypes]);

  const handleDismiss = (id: string) => {
    document.getElementById(id)?.classList.add("alert-leave");

    setTimeout(() => {
      setAlerts((prevAlerts) => {
        return prevAlerts.filter((alert) => alert.id !== id);
      });
    }, 300);
  };

  const handleReset = () => {
    setAlerts([...alertTypes]);
  };

  return (
    <>
      <h2>Alerts</h2>
      <button id="reset" onClick={handleReset}>
        Reset
      </button>
      <div>
        {alerts.map(({ type, message, id }) => (
          <Alert
            id={id}
            key={id}
            type={type}
            onDismiss={() => {
              handleDismiss(id);
            }}
          >
            {message}
          </Alert>
        ))}
      </div>
    </>
  );
}
