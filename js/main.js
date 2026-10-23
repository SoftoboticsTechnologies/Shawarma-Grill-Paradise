/* Shawarma Grill Paradise — site-wide behaviour
   - sticky header state
   - mobile navigation drawer (keyboard + touch accessible)
   - reveal-on-scroll animations */
(function () {
  "use strict";

  /* ---------- Header shadow once the page scrolls ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var drawer = document.getElementById("mobile-nav");

  if (toggle && drawer) {
    var panel = drawer.querySelector(".mobile-nav__panel");
    var lastFocus = null;

    var focusables = function () {
      return panel.querySelectorAll('a[href], button:not([disabled])');
    };

    var open = function () {
      lastFocus = document.activeElement;
      drawer.classList.add("is-open");
      drawer.removeAttribute("aria-hidden");
      drawer.removeAttribute("inert");
      toggle.setAttribute("aria-expanded", "true");
      document.body.classList.add("nav-open");
      var first = focusables()[0];
      if (first) window.setTimeout(function () { first.focus(); }, 60);
    };

    var close = function () {
      drawer.classList.remove("is-open");
      drawer.setAttribute("aria-hidden", "true");
      drawer.setAttribute("inert", "");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
      if (lastFocus) lastFocus.focus();
    };

    toggle.addEventListener("click", function () {
      if (drawer.classList.contains("is-open")) close(); else open();
    });

    drawer.addEventListener("click", function (e) {
      if (e.target.closest("[data-nav-close]")) close();
    });

    document.addEventListener("keydown", function (e) {
      if (!drawer.classList.contains("is-open")) return;
      if (e.key === "Escape") { close(); return; }
      if (e.key === "Tab") {
        var items = focusables();
        var first = items[0];
        var last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    // Close the drawer if the viewport grows back to desktop width
    var mq = window.matchMedia("(min-width: 961px)");
    var onMq = function (e) { if (e.matches && drawer.classList.contains("is-open")) close(); };
    if (mq.addEventListener) mq.addEventListener("change", onMq); else mq.addListener(onMq);
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }
})();
