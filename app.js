const sections = Array.from(document.querySelectorAll(".section"));
const navLinks = Array.from(document.querySelectorAll(".sidebar a"));
const toast = document.querySelector("#toast");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 1500);
}

function copyText(text) {
  navigator.clipboard.writeText(text).then(
    () => showToast(`복사됨: ${text}`),
    () => showToast("복사하지 못했습니다.")
  );
}

document.addEventListener("click", (event) => {
  const copyTarget = event.target.closest("[data-copy]");
  if (!copyTarget) return;
  copyText(copyTarget.dataset.copy);
});

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    const id = visible.target.id;
    for (const link of navLinks) {
      link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
    }
  },
  { rootMargin: "-20% 0px -65% 0px", threshold: [0.1, 0.25, 0.5] }
);

for (const section of sections) {
  observer.observe(section);
}
