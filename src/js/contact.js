/**
 * Contact Us Form Handling Logic
 * Created by: Izuogu David Onochie
 * Handles front-end validation and saves message inquiries directly into browser LocalStorage.
 */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contact-form");
  const responseEl = document.querySelector("#contact-response");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.querySelector("#contact-name").value.trim();
    const email = document.querySelector("#contact-email").value.trim();
    const subject = document.querySelector("#contact-subject").value.trim();
    const message = document.querySelector("#contact-message").value.trim();

    if (!name || !email || !subject || !message) {
      showFeedback("Please fill out all fields before submitting.", "error");
      return;
    }

    // Structure inquiry object
    const newInquiry = {
      id: Date.now(),
      name,
      email,
      subject,
      message,
      submittedAt: new Date().toISOString()
    };

    // Save to LocalStorage without needing a database backend
    const inquiries = JSON.parse(localStorage.getItem("customer_inquiries")) || [];
    inquiries.push(newInquiry);
    localStorage.setItem("customer_inquiries", JSON.stringify(inquiries));

    // Display confirmation and reset form
    showFeedback("Thank you for your message! Our team will get back to you shortly.", "success");
    form.reset();
  });

  function showFeedback(msg, type) {
    responseEl.textContent = msg;
    responseEl.className = `contact-response ${type}`;
  }
});
