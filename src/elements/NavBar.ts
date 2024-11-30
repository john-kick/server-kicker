import HTMLElement from "./HTMLElement";
import Button from "./Button";
import Anchor from "./Anchor";
import Form from "./Form";

export default class NavBar extends HTMLElement {
  public tagName: string = "nav";

  public preRender(): void {
    const logoutButton = new Button();
    logoutButton.bsType = "link";
    logoutButton.innerText = "Logout";
    logoutButton.type = "submit";

    const logoutForm = new Form();
    logoutForm.action = "/auth/logout";
    logoutForm.method = "POST";
    logoutForm.appendComponents(logoutButton);

    this.appendComponents(`
		<div class="container-fluid">
			<a class="navbar-brand" href="#">
				<img src="images/logo512.png" alt="Logo" width="30" height="30" class="d-inline-block align-text-top">
				Server Kicker
			</a>
 			<div class="d-flex">
				${logoutForm.render()}
      </div>
		</div>`);

    this._classList.push("navbar", "bg-body-tertiary");
  }
}
