// Mobile nav toggle
(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
})();

// Footer year
(function () {
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();

// Gallery lightbox
(function () {
  var items = Array.prototype.slice.call(document.querySelectorAll(".gallery button"));
  var box = document.querySelector(".lightbox");
  if (!items.length || !box) return;

  var img = box.querySelector("img");
  var current = 0;
  var lastFocus = null;

  function show(i) {
    current = (i + items.length) % items.length;
    var btn = items[current];
    img.src = btn.getAttribute("data-full");
    img.alt = btn.querySelector("img").alt;
  }
  function open(i) {
    lastFocus = document.activeElement;
    show(i);
    box.classList.add("open");
    document.body.style.overflow = "hidden";
    box.querySelector(".lb-close").focus();
  }
  function close() {
    box.classList.remove("open");
    document.body.style.overflow = "";
    img.removeAttribute("src");
    if (lastFocus) lastFocus.focus();
  }

  items.forEach(function (btn, i) {
    btn.addEventListener("click", function () { open(i); });
  });
  box.querySelector(".lb-close").addEventListener("click", close);
  box.querySelector(".lb-prev").addEventListener("click", function () { show(current - 1); });
  box.querySelector(".lb-next").addEventListener("click", function () { show(current + 1); });
  box.addEventListener("click", function (e) { if (e.target === box) close(); });

  document.addEventListener("keydown", function (e) {
    if (!box.classList.contains("open")) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") show(current - 1);
    else if (e.key === "ArrowRight") show(current + 1);
  });
})();
