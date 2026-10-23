/* Feedback form — reproduces the original SureForms validation
   ("This field is required." on each required field).

   Submission:
   The original form posted to a WordPress/SureForms backend that a static
   site cannot run. Set data-endpoint on the <form> to any endpoint that
   accepts a JSON POST (e.g. Formspree, a serverless function, or the WP
   REST API) and it will be used. With no endpoint configured, the message
   is handed to the restaurant's WhatsApp number (the same channel the
   original site uses for orders) so the button is never a dead end. */
(function () {
  "use strict";

  var form = document.getElementById("feedback-form");
  if (!form) return;

  var WA_NUMBER = "918660347150";
  var alertBox = form.querySelector(".form-alert");
  var fields = Array.prototype.slice.call(form.querySelectorAll(".field"));

  var isValid = function (input) {
    var v = input.value.trim();
    if (input.required && !v) return false;
    if (v && input.type === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    if (v && input.type === "tel") return /^[+\d][\d\s()-]{5,}$/.test(v);
    return true;
  };

  var check = function (field) {
    var input = field.querySelector("input, textarea");
    var ok = isValid(input);
    field.classList.toggle("has-error", !ok);
    input.setAttribute("aria-invalid", ok ? "false" : "true");
    return ok;
  };

  fields.forEach(function (field) {
    var input = field.querySelector("input, textarea");
    input.addEventListener("blur", function () { if (input.value || field.classList.contains("has-error")) check(field); });
    input.addEventListener("input", function () { if (field.classList.contains("has-error")) check(field); });
  });

  var showError = function (show) { alertBox.classList.toggle("is-visible", show); };

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    showError(false);
    var firstBad = null;
    fields.forEach(function (f) { if (!check(f) && !firstBad) firstBad = f; });
    if (firstBad) { firstBad.querySelector("input, textarea").focus(); return; }

    var data = {};
    fields.forEach(function (f) {
      var input = f.querySelector("input, textarea");
      data[input.name] = input.value.trim();
    });

    var endpoint = form.getAttribute("data-endpoint");
    var button = form.querySelector("[type=submit]");

    if (endpoint) {
      button.disabled = true;
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data)
      }).then(function (res) {
        if (!res.ok) throw new Error(res.status);
        form.reset();
      }).catch(function () {
        showError(true);
      }).then(function () { button.disabled = false; });
      return;
    }

    var text = [
      "Name: " + data.name,
      "Email: " + data.email,
      "Contact Number: " + data.phone,
      "Subject: " + data.subject,
      data.message ? "Message: " + data.message : ""
    ].filter(Boolean).join("\n");
    var url = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(text);
    var win = window.open(url, "_blank");
    if (win) {
      win.opener = null;
    } else {
      // popup blocked — fall back to same-tab navigation
      window.location.href = url;
    }
  });
})();
