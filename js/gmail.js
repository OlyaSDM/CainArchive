
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  let isValid = true;

  this.querySelectorAll(".error-message").forEach(el => el.textContent = "");
  this.querySelectorAll("input, textarea").forEach(el => el.classList.remove("error"));

  // name
  const name = this.elements["name"];
  if (!name.value.trim()) {
    showError(name, "Please enter your name.");
    isValid = false;
  }

  // email
  const email = this.elements["email"];
  if (!email.value.trim()) {
    showError(email, "Please enter your email.");
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    showError(email, "Please enter a valid email address.");
    isValid = false;
  }

  // message
  const message = this.elements["message"];
  if (!message.value.trim()) {
    showError(message, "Please enter your message.");
    isValid = false;
  }

  // checkbox
  const privacy = this.elements["privacy"];
  if (!privacy.checked) {
    showError(privacy, "You must accept the privacy policy.");
    isValid = false;
  }

  if (isValid) {
    this.submit();
  }
});

function showError(input, message) {
  input.classList.add("error");
  const errorElement = input.closest(".form-group").querySelector(".error-message");
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = "block";
  }
}
