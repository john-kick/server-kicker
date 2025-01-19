import Alert from "@/components/Alert";

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
          id={index.toString()}
          key={index}
          type={validation.condition ? "success" : "warning"}
        >
          {validation.message}
        </Alert>
      ))}
    </div>
  );
}
