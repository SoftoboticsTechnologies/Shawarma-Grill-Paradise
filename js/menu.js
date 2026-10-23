/* Menu page — category tabs follow the reader (scroll-spy).
   The "Order" links are plain wa.me links built into the HTML, exactly
   reproducing the original order() function:
     "Hi, I want to order: " + item  →  https://wa.me/918660347150?text=...
   so ordering works even without JavaScript. */
(function () {
  "use strict";

  var tabs = Array.prototype.slice.call(document.querySelectorAll(".menu-tabs__list a"));
  var tabBar = document.querySelector(".menu-tabs__list");
  var tabNav = document.querySelector(".menu-tabs");
  var sections = Array.prototype.slice.call(document.querySelectorAll(".menu-cat[id]"));
  if (!tabs.length || !sections.length) return;

  var byId = {};
  tabs.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });

  var setActive = function (id) {
    var link = byId[id];
    if (!link || link.classList.contains("is-active")) return;
    tabs.forEach(function (a) { a.classList.remove("is-active"); a.removeAttribute("aria-current"); });
    link.classList.add("is-active");
    link.setAttribute("aria-current", "true");
    // keep the active chip visible inside the horizontal tab bar
    var left = link.offsetLeft - (tabBar.clientWidth - link.offsetWidth) / 2;
    tabBar.scrollTo({ left: left, behavior: "smooth" });
  };

  // A tapped tab wins until the user scrolls on their own
  // (near the page end its section may never reach the top).
  var locked = false;
  var unlock = function () { locked = false; };

  var spy = function () {
    if (locked) return;
    var line = tabNav.getBoundingClientRect().bottom + 24;
    var current = sections[0].id;
    sections.forEach(function (s) { if (s.getBoundingClientRect().top <= line) current = s.id; });
    setActive(current);
  };

  var ticking = false;
  window.addEventListener("scroll", function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () { ticking = false; spy(); });
  }, { passive: true });

  ["wheel", "touchstart", "keydown"].forEach(function (evt) {
    window.addEventListener(evt, unlock, { passive: true });
  });

  tabs.forEach(function (a) {
    a.addEventListener("click", function () {
      setActive(a.getAttribute("href").slice(1));
      locked = true;
    });
  });

  spy();
})();
