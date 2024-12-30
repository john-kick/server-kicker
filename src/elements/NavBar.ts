import HTMLElement from "./HTMLElement";
import Button from "./Button";
import Form from "./Form";
import Container from "./Container";
import Anchor from "./Anchor";
import Image from "./Image";

export default class NavBar extends HTMLElement {
  public tagName: string = "nav";

  public preRender(): void {
    const wrapper = new Container();
    wrapper.appendClasses("container-fluid");

    const homepageLink = new Anchor();
    homepageLink.href = "/dashboard";
    homepageLink.appendClasses("navbar-brand");

    const logo = new Image("/images/logo512.png", "Logo");
    logo
      .setAttribute("width", "30")
      .setAttribute("height", "30")
      .appendClasses("d-inline-block", "align-text-top", "me-1");

    homepageLink.appendComponents(logo, "Server Kicker");

    const logoutWrapper = new Container();
    logoutWrapper.appendClasses("d-flex");

    const logoutButton = new Button("Logout", "link");
    logoutButton.setAttribute("type", "submit");

    const logoutForm = new Form();
    logoutForm.action = "/auth/logout";
    logoutForm.method = "POST";
    logoutForm.appendComponents(logoutButton);

    logoutWrapper.appendComponents(logoutForm);
    wrapper.appendComponents(homepageLink, logoutWrapper);

    this.appendComponents(wrapper);

    this._classList.push("navbar", "bg-body-tertiary");
  }
}
