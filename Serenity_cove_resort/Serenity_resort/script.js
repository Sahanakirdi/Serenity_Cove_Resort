
const navbar = document.getElementById("mainNav");
const updateNavbar = () => navbar.classList.toggle("scrolled", window.scrollY > 40);
window.addEventListener("scroll", updateNavbar);
updateNavbar();


const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}


const galleryModalElement = document.getElementById("galleryModal");
const galleryModal = new bootstrap.Modal(galleryModalElement);
const modalImage = document.getElementById("modalImage");

document.querySelectorAll(".gallery-item").forEach(item => {
  item.addEventListener("click", () => {
    modalImage.src = item.dataset.image;
    galleryModal.show();
  });
});

galleryModalElement.addEventListener("hidden.bs.modal", () => {
  modalImage.src = "";
});


const enquiryForm = document.getElementById("enquiryForm");
const formMessage = document.getElementById("formMessage");
const checkin = document.getElementById("checkin");
const checkout = document.getElementById("checkout");

const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  .toISOString().split("T")[0];
checkin.min = localToday;
checkout.min = localToday;

checkin.addEventListener("change", () => {
  checkout.min = checkin.value || localToday;
  if (checkout.value && checkout.value <= checkin.value) checkout.value = "";
});

enquiryForm.addEventListener("submit", event => {
  event.preventDefault();
  formMessage.textContent = "";
  formMessage.classList.remove("error");

  if (!enquiryForm.checkValidity()) {
    enquiryForm.reportValidity();
    return;
  }
  if (checkin.value && checkout.value && checkout.value <= checkin.value) {
    formMessage.textContent = "Check-out date must be after the check-in date.";
    formMessage.classList.add("error");
    checkout.focus();
    return;
  }

  const guestName = document.getElementById("fullName").value.trim();
  formMessage.textContent = `Thank you, ${guestName}! Your enquiry has been prepared. Our team will be in touch soon.`;
  enquiryForm.reset();
  checkout.min = localToday;
});

document.getElementById("year").textContent = new Date().getFullYear();


document.querySelectorAll("#navMenu .nav-link, #navMenu .nav-cta").forEach(link => {
  link.addEventListener("click", () => {
    const menu = document.getElementById("navMenu");
    if (menu.classList.contains("show")) bootstrap.Collapse.getOrCreateInstance(menu).hide();
  });
});
