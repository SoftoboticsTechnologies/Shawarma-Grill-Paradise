/* Image carousel — mirrors the original Elementor carousel settings:
   arrows + dots, autoplay every 5s, pause on hover/interaction, infinite loop.
   Markup: [data-carousel] > .carousel__viewport > .carousel__track > .carousel__slide */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll("[data-carousel]").forEach(function (root) {
    var viewport = root.querySelector(".carousel__viewport");
    var track = root.querySelector(".carousel__track");
    var slides = Array.prototype.slice.call(track.children);
    var prev = root.querySelector("[data-carousel-prev]");
    var next = root.querySelector("[data-carousel-next]");
    var dotsWrap = root.querySelector(".carousel__dots");
    var delay = parseInt(root.getAttribute("data-autoplay"), 10) || 5000;
    var index = 0;
    var timer = null;
    var paused = false;
    var interacted = false;

    var perView = function () {
      var w = slides[0].getBoundingClientRect().width;
      return Math.max(1, Math.round(viewport.clientWidth / w));
    };
    var maxIndex = function () { return Math.max(0, slides.length - perView()); };

    var renderDots = function () {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = "";
      for (var i = 0; i <= maxIndex(); i++) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "carousel__dot";
        b.setAttribute("aria-label", "Go to slide " + (i + 1));
        b.dataset.index = i;
        dotsWrap.appendChild(b);
      }
    };

    var update = function () {
      if (index > maxIndex()) index = maxIndex();
      var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      var step = slides[0].getBoundingClientRect().width + gap;
      track.style.transform = "translateX(" + (-index * step) + "px)";
      var pv = perView();
      slides.forEach(function (s, i) {
        var visible = i >= index && i < index + pv;
        s.setAttribute("aria-hidden", visible ? "false" : "true");
      });
      if (dotsWrap) {
        Array.prototype.forEach.call(dotsWrap.children, function (d, i) {
          d.setAttribute("aria-current", i === index ? "true" : "false");
        });
      }
    };

    var go = function (i) {
      var max = maxIndex();
      index = i > max ? 0 : i < 0 ? max : i; // infinite wrap
      update();
    };

    var stop = function () { window.clearInterval(timer); timer = null; };
    var start = function () {
      stop();
      if (reduceMotion || interacted || maxIndex() === 0) return;
      timer = window.setInterval(function () { if (!paused) go(index + 1); }, delay);
    };
    var userAction = function () { interacted = true; stop(); }; // pause_on_interaction

    if (prev) prev.addEventListener("click", function () { userAction(); go(index - 1); });
    if (next) next.addEventListener("click", function () { userAction(); go(index + 1); });
    if (dotsWrap) dotsWrap.addEventListener("click", function (e) {
      var b = e.target.closest(".carousel__dot");
      if (b) { userAction(); go(parseInt(b.dataset.index, 10)); }
    });

    // pause_on_hover
    root.addEventListener("mouseenter", function () { paused = true; });
    root.addEventListener("mouseleave", function () { paused = false; });
    root.addEventListener("focusin", function () { paused = true; });
    root.addEventListener("focusout", function () { paused = false; });

    // keyboard arrows
    root.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { userAction(); go(index - 1); }
      if (e.key === "ArrowRight") { userAction(); go(index + 1); }
    });

    // touch swipe
    var x0 = null;
    viewport.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    viewport.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) { userAction(); go(index + (dx < 0 ? 1 : -1)); }
      x0 = null;
    });

    var resizeTimer;
    window.addEventListener("resize", function () {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(function () { renderDots(); update(); start(); }, 150);
    });

    renderDots();
    update();
    start();
  });
})();
