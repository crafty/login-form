// Mock Authentication
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

const MOCK_USER_CREDENTIALS = {
  username: "user@gmail.com",
  password: "oJ6ywJdMK.6-BH",
};

export const handleFormSubmit = async (event) => {
  event.preventDefault();

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const submitBtn = document.getElementById("submitBtn");
  const form = document.getElementById("form");
  const formData = new FormData(event.target);
  const email = formData.get("email");
  const password = formData.get("password");
  const encryptedPassword = bcrypt.hashSync(password, salt);

  submitBtn.loading = true;

  if (!emailInput.checkValidity() || !passwordInput.checkValidity()) {
    submitBtn.loading = false;
    return;
  }

  const response = await authCredentials(email, encryptedPassword);

  if (response.error.type) {
    submitBtn.loading = false;
    handleError(response.error);
    return;
  }

  handleLogin(response.token);
  submitBtn.loading = false;
  form.reset();
};

const authCredentials = async (email, encryptedPassword) => {
  const response = {
    token: null,
    error: {
      type: null,
      message: null,
    },
  };

  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (email !== MOCK_USER_CREDENTIALS.username) {
    response.error = {
      type: "email",
      message:
        "Email address was not found! Try again or click Sign up to create an account.",
    };

    return response;
  }

  const matchingPassword = bcrypt.compareSync(
    MOCK_USER_CREDENTIALS.password,
    encryptedPassword
  );

  if (!matchingPassword) {
    response.error = {
      type: "password",
      message:
        "Wrong password. Try again or click Forgot password to reset it.",
    };
    return response;
  }

  response.token =
    "MOCK_TOKEN_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY3Mjc2NjAyOCwiZXhwIjoxNjcyODAyMDI4fQ.P1_rB3hJ5afwiG4TWXLq6jOAcVJkvQZ2Z-ZZOnQ1dZw";
  return response;
};

const escapeHtml = (html) => {
  const div = document.createElement("div");
  div.textContent = html;
  return div.innerHTML;
};

const notify = (
  message,
  variant = "primary",
  icon = "info-circle",
  duration = 5000
) => {
  const alert = Object.assign(document.createElement("sl-alert"), {
    variant,
    closable: true,
    duration: duration,
    innerHTML: `
        <sl-icon name="${icon}" slot="icon"></sl-icon>
        ${escapeHtml(message)}
      `,
  });

  document.body.append(alert);
  return alert.toast();
};

const handleError = (error) => {
  notify(error.message, "danger");
  return;
};

const handleLogin = (token) => {
  localStorage.setItem("token", `Bearer ${token}`);
  notify("You have successfully logged in!");
};
