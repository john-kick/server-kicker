const BUTTON_TYPES = [null, "outline", "text"];

const BUTTON_COLORS = [
  "primary",
  "secondary",
  "tertiary",
  "info",
  "success",
  "warning",
  "error"
];

export default function ButtonField() {
  return (
    <>
      <h2>Buttons</h2>
      <div className="button-col">
        {BUTTON_COLORS.map((color) => {
          return (
            <div key={color} className="button-row">
              <h3>{color}</h3>
              {BUTTON_TYPES.map((type) => {
                return (
                  <div key={`${type} ${color}`} className="button-block">
                    {["large", "medium", "small"].map((size) => {
                      return (
                        <button
                          key={`${color} ${type} ${size}`}
                          className={`${
                            type ? type + "-" : ""
                          }${color} ${size}`}
                        >
                          Button
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}
