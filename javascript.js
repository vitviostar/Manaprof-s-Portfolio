document.addEventListener("DOMContentLoaded", () => {
  // Select all elements you want to animate only when visible
  const animatedElements = document.querySelectorAll(".info, .line, .h1, .h2, .img2, .text2, .text");

  // Pause their animations initially
  animatedElements.forEach(el => {
    el.style.animationPlayState = "paused";
  });

  // Observer to resume animation when 10% visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        entry.target.style.animationPlayState = "running"; // resume animation
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  // Observe each element
  animatedElements.forEach(el => observer.observe(el));

 // Tooltip logic
  document.querySelectorAll(".mobile1").forEach(box => {
    let timeout;
    const tip = box.querySelector(".side-text");
    if (!tip) return;

    // Desktop hover
    box.addEventListener("mouseenter", () => {
      clearTimeout(timeout);
      tip.style.opacity = "1";
      tip.style.transform = "translateX(-50%) translateY(0)";
      tip.style.visibility = "visible";
      tip.style.pointerEvents = "auto";
    });

    box.addEventListener("mouseleave", () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        tip.style.opacity = "0";
        tip.style.transform = "translateX(-50%) translateY(-10px)";
        tip.style.visibility = "hidden";
        tip.style.pointerEvents = "none";
      }, 2000);
    });

    // Mobile click/tap
    box.addEventListener("click", () => {
      const visible = tip.style.opacity === "1";
      tip.style.opacity = visible ? "0" : "1";
      tip.style.visibility = visible ? "hidden" : "visible";
      tip.style.transform = visible ? "translateX(-50%) translateY(-10px)" : "translateX(-50%) translateY(0)";
      // Clear any existing timeout so it doesn't interfere
      clearTimeout(timeout);
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const optionsContainer = document.getElementById("clickOptions");
  if (optionsContainer) {
    const phoneNumber = "254706935999";
    const phoneNumberIntl = "+254706935999";

    // Links
    const simCall = `<a href="tel:${phoneNumberIntl}">Call with SIM</a>`;
    const whatsappChat = `<a href="https://wa.me/${phoneNumber}?text=Hello%20I%20saw%20your%20portfolio" target="_blank">Open WhatsApp Chat</a>`;

    const isMobile = /Mobi|Android/i.test(navigator.userAgent);

    if (isMobile) {
      optionsContainer.innerHTML = `${simCall} | ${whatsappChat}`;
    } else {
      optionsContainer.innerHTML = `${whatsappChat}`;
    }
  }
});
