const BUTTON_TYPES = [null, "outline", "text"];

const BUTTON_COLORS = [
  { color: "primary", title: "Primary" },
  { color: "secondary", title: "Secondary" },
  { color: "info", title: "Info" },
  { color: "success", title: "Success" },
  { color: "warning", title: "Warning" },
  { color: "danger", title: "Danger" }
];

export default function ButtonField() {
  return (
    <>
      <h2>Buttons</h2>
      <div className="button-col">
        {BUTTON_COLORS.map(({ color, title }) => {
          return (
            <div key={color} className="button-row">
              <h3>{title}</h3>
              {BUTTON_TYPES.map((type) => {
                return (
                  <div key={`${type} ${color}`} className="button-block">
                    {["large", "medium", "small"].map((size) => {
                      return (
                        <button
                          key={`${color} ${type} ${size}`}
                          className={`${color} ${type ?? ""} ${size}`}
                        >
                          Button
                        </button>
                      );
                    })}
                    <button className={`${color} ${type ?? ""}`} disabled>
                      Button
                    </button>
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
