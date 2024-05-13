import "./style.css";
import { handleFormSubmit } from "./utilities.js";

document.querySelector("#app").innerHTML = `
  <div class="page-container">
    <sl-alert id="alert" variant="primary" duration="6000" closable>
      <sl-icon slot="icon" name="info-circle"></sl-icon>
    </sl-alert>

    <section>
      <img src="/Flanders_Badge_01.png" alt="Flanders Logo" class="logo" />
      <h1>Welcome Back!</h1>
    </section>

    <form id="form" class="validity-styles form-container">
      <sl-input id="email" type="email" id="email" name="email" label="Email" required>
        <sl-icon name="at" slot="suffix"></sl-icon>
      </sl-input>
      <sl-input type="password" id="password" name="password" label="Password" password-toggle minlength="8" maxlength="127"required> </sl-input>
      <sl-button id="submitBtn" type="submit" variant="primary">Login</sl-button>
    </form>

    <sl-button id="autofillBtn">Autofill Valid Credentials</sl-button>
  </div>
`;

const form = document.querySelector(".form-container");
form.addEventListener("submit", handleFormSubmit);

const autofillBtn = document.querySelector("#autofillBtn");
autofillBtn.addEventListener("click", () => {
  document.querySelector("#email").value = "user@gmail.com";
  document.querySelector("#password").value = "oJ6ywJdMK.6-BH";
});
