/**
 * Contact Us Form Handling Logic
 * Created by: Izuogu David Onochie
 * Handles front-end validation and saves message inquiries directly into browser LocalStorage.
 */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contact-form");
  const responseEl = document.querySelector("#contact-response");

  console.log("Form element found:", form);

  if (!form) {
    console.error("ERROR: Form with ID #contact-form was not found in the HTML!");
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Stop page reload
    console.log("Submit button clicked!");

    const name = document.querySelector("#contact-name")?.value.trim();
    const email = document.querySelector("#contact-email")?.value.trim();
    const subject = document.querySelector("#contact-subject")?.value.trim();
    const message = document.querySelector("#contact-message")?.value.trim();

    console.log("Captured Data:", { name, email, subject, message });

    // Save to LocalStorage
    const newInquiry = { name, email, subject, message, date: new Date().toISOString() };
    const inquiries = JSON.parse(localStorage.getItem("customer_inquiries")) || [];
    inquiries.push(newInquiry);
    localStorage.setItem("customer_inquiries", JSON.stringify(inquiries));

    if (responseEl) {
      responseEl.textContent = "Message received and stored successfully!";
      responseEl.style.color = "green";
    }

    form.reset();
  });
});
