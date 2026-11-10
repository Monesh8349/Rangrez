const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const toast = document.getElementById("toast");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
}

document.querySelectorAll(".event-enquire").forEach(button => {
  button.addEventListener("click", () => {
    document.getElementById("enquiry").value = "Upcoming Events";
    document.querySelector('textarea[name="message"]').value =
      `Hi RANGREZ team, I would like to know more about ${button.dataset.event}. Please share updates when available.`;
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
    showToast(`Enquiry started for ${button.dataset.event}`);
  });
});

document.querySelectorAll("[data-enquiry]").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("enquiry").value = link.dataset.enquiry;
  });
});

document.getElementById("contactForm")?.addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const subject = encodeURIComponent(`RANGREZ enquiry: ${data.get("enquiry")}`);
  const body = encodeURIComponent(
    `Name: ${data.get("name")}\nContact: ${data.get("contact")}\nEnquiry: ${data.get("enquiry")}\n\nMessage:\n${data.get("message")}`
  );

  // Demo behaviour: opens the visitor's email application. Replace with a backend/form service for production.
  window.location.href = `mailto:hello@rangrez.example?subject=${subject}&body=${body}`;
  document.getElementById("formMessage").textContent =
    "Your email app should open with the enquiry prepared. Replace hello@rangrez.example with the official email before publishing.";
});







/* ===== RANGREZ SPONSOR MODAL FUNCTIONALITY ===== */
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("sponsorModal");
  const closeBtn = document.getElementById("sponsorClose");
  const laterBtn = document.getElementById("sponsorLater");
  const ctaBtn = document.getElementById("sponsorCTA");

  if (!modal || !closeBtn || !laterBtn || !ctaBtn) return;

  function closeSponsorModal() {
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  function openSponsorModal() {
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  // Show on every page load or reload
  setTimeout(openSponsorModal, 450);

  closeBtn.addEventListener("click", closeSponsorModal);
  laterBtn.addEventListener("click", closeSponsorModal);

  // Close when clicking the dark backdrop
  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeSponsorModal();
    }
  });

  // Close with Escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeSponsorModal();
    }
  });

  // CTA closes modal and scrolls to the existing partners section
  ctaBtn.addEventListener("click", function (event) {
    const partners = document.getElementById("partners");

    if (partners) {
      event.preventDefault();
      closeSponsorModal();
      partners.scrollIntoView({ behavior: "smooth" });
    }
  });
});



const music = document.getElementById("backgroundMusic");
const musicToggle = document.getElementById("musicToggle");
const musicIcon = musicToggle.querySelector("i");

function updateMusicIcon() {
    if (music.paused || music.muted) {
        musicIcon.className = "bi bi-volume-mute-fill";
        musicToggle.title = "Play music";
        musicToggle.setAttribute("aria-label", "Play music");
    } else {
        musicIcon.className = "bi bi-volume-up-fill";
        musicToggle.title = "Mute music";
        musicToggle.setAttribute("aria-label", "Mute music");
    }
}

// Try to play music whenever the page loads
music.volume = 0.35;

music.play()
    .then(updateMusicIcon)
    .catch(() => {
        updateMusicIcon();
    });

// Speaker button: start music or toggle mute
musicToggle.addEventListener("click", async () => {
    if (music.paused) {
        music.muted = false;

        try {
            await music.play();
        } catch (error) {
            console.log("Music playback was blocked by the browser.");
        }
    } else {
        music.muted = !music.muted;
    }

    updateMusicIcon();
});

music.addEventListener("play", updateMusicIcon);
music.addEventListener("pause", updateMusicIcon);
music.addEventListener("volumechange", updateMusicIcon);









function startMusicOnFirstInteraction() {
    if (music.paused) {
        music.muted = false;
        music.play().then(updateMusicIcon).catch(updateMusicIcon);
    }

    document.removeEventListener("click", startMusicOnFirstInteraction);
    document.removeEventListener("keydown", startMusicOnFirstInteraction);
    document.removeEventListener("touchstart", startMusicOnFirstInteraction);
}

document.addEventListener("click", startMusicOnFirstInteraction);
document.addEventListener("keydown", startMusicOnFirstInteraction);
document.addEventListener("touchstart", startMusicOnFirstInteraction);