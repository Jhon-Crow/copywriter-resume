window.resumeProfile = {
  name: "Иван Оханов",
  role: "Копирайтер для социальных сетей и экспертного контента",
  location: "Россия",
  phone: "+7 (950) 240-78-71",
  email: "t4t1.tati@yandex.ru",
  telegram: "@Shanwown",
  portfolio: "https://jhon-crow.github.io/copywriter-resume",
  summary:
    "Пишу тексты для экспертов и сервисных бизнесов: прогревы, продающие посты, отработку возражений. Умею переводить вводные клиента в ясный текст с коммерческой задачей, бережным тоном и понятным следующим шагом."
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

