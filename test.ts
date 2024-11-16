import Button from "./src/components/Button";

const btn = new Button();
btn.setType("test");
btn.innerHTML = "Test Button";
btn.setAttribute("test", "test");
console.log(btn.render());
