import { Alert } from "@mui/material";

type ValidationMessage = {
  condition: boolean;
  message: string;
};

type ValidationBoxProps = {
  validationMessages: ValidationMessage[];
};

export default function ValidationBox({
  validationMessages
}: ValidationBoxProps): React.JSX.Element {
  return (
    <div id="validation-box" className="paper">
      {validationMessages.map((validation, index) => (
        <Alert
          key={index}
          severity={validation.condition ? "success" : "warning"}
          className={`validation-check ${
            validation.condition ? "valid" : "invalid"
          }`}
        >
          {validation.message}
        </Alert>
      ))}
    </div>
  );
}
