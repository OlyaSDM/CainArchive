document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault(); 
  let isValid = true;

  this.querySelectorAll(".error-message").forEach(el => el.textContent = "");
  this.querySelectorAll("input, textarea").forEach(el => el.classList.remove("error"));

  const name = this.elements["name"];
  if (!name.value.trim()) {
    showError(name, "Please enter your name.");
    isValid = false;
  }

  const email = this.elements["email"];
  if (!email.value.trim()) {
    showError(email, "Please enter your email.");
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    showError(email, "Please enter a valid email address.");
    isValid = false;
  }

  const message = this.elements["message"];
  if (!message.value.trim()) {
    showError(message, "Please enter your message.");
    isValid = false;
  }

  const privacy = this.elements["privacy"];
  if (!privacy.checked) {
    showError(privacy, "You must accept the privacy policy.");
    isValid = false;
  }

  if (isValid) {
    const formData = new FormData(this);

    const data = Object.fromEntries(formData.entries());

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        access_key: "ВАШ_API_KEY",  
        ...data
      })
    })
    .then(response => response.json())
    .then(result => {
      if (result.success) {
        alert("Message sent successfully!");
        this.reset();  
      } else {
        alert("Error sending message.");
      }
    })
    .catch(error => {
      alert("Something went wrong. Please try again later.");
      console.error("Error:", error);
    });
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
