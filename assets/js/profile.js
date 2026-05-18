window.resumeProfile = {
  name: "Имя Фамилия",
  role: "Копирайтер для социальных сетей и экспертного контента",
  location: "Город, страна",
  phone: "+7 (___) ___-__-__",
  email: "name@example.com",
  telegram: "@username",
  portfolio: "portfolio.example.com",
  summary:
    "Пишу тексты для экспертов и сервисных бизнесов: прогревы, продающие посты, отработку возражений и кейсы. Умею переводить вводные клиента в ясный текст с коммерческой задачей, бережным тоном и понятным следующим шагом."
};

document.addEventListener("DOMContentLoaded", () => {
  const profile = window.resumeProfile || {};

  document.querySelectorAll("[data-profile]").forEach((node) => {
    const key = node.getAttribute("data-profile");
    if (profile[key]) {
      node.textContent = profile[key];
    }
  });

  document.querySelectorAll("[data-profile-href]").forEach((node) => {
    const key = node.getAttribute("data-profile-href");
    const value = profile[key];
    if (!value) return;

    if (key === "email") node.setAttribute("href", `mailto:${value}`);
    if (key === "phone") node.setAttribute("href", `tel:${value.replace(/[^+\d]/g, "")}`);
    if (key === "telegram") node.setAttribute("href", `https://t.me/${value.replace("@", "")}`);
    if (key === "portfolio") node.setAttribute("href", value.startsWith("http") ? value : `https://${value}`);
  });
});

