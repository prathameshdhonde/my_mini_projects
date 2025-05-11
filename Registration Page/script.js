document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the default form submission to perform validation

  const fullName = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirmPassword").value;
  const gender = document.getElementById("gender").value;
  const errorMsg = document.getElementById("errorMsg");

  // Full Name Validation
  const nameParts = fullName.split(" ").filter(Boolean); // Remove empty parts
  if (nameParts.length < 2) {
    errorMsg.textContent = "*Enter First name and Last name.";
    return;
  }

  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");
  const nameRegex = /^[A-Za-z]+$/;

  if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
    errorMsg.textContent = "*Enter a valid name";
    return;
  }

  // Email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    errorMsg.textContent = "*Please enter a valid email address.";
    return;
  }

  // Password Validation
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/;
  if (!passwordRegex.test(password)) {
    errorMsg.textContent = "*Password must be at least 8 characters, include uppercase, lowercase, number, and special character.";
    return;
  }

  if (password !== confirm) {
    errorMsg.textContent = "*Passwords do not match!";
    return;
  }

  // Gender Validation
  if (!gender) {
    errorMsg.textContent = "*Please select a gender.";
    return;
  }

  // All validations passed
  errorMsg.textContent = "";

  // Submit the form programmatically after all validations pass
  alert("Account Created!");
  document.getElementById("registerForm").submit(); // This submits the form after validation
});

// Toggle password visibility with Font Awesome icons
document.querySelectorAll(".toggle-password").forEach((icon) => {
  icon.addEventListener("click", function () {
    const input = document.querySelector(this.getAttribute("toggle"));
    const isHidden = input.type === "password";

    input.type = isHidden ? "text" : "password";
    this.classList.toggle("fa-eye");
    this.classList.toggle("fa-eye-slash");
    this.setAttribute("title", isHidden ? "Hide Password" : "Show Password");
  });
});