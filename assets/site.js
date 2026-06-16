import { businessConfig as config } from "./business-config.js";
import { menuItems } from "../data/menu.js";

const $all = (selector) => Array.from(document.querySelectorAll(selector));
const hasValue = (value) => typeof value === "string" && value.trim().length > 0;

function setText(selector, value, fallback = "") {
  $all(selector).forEach((node) => {
    node.textContent = hasValue(value) ? value : fallback;
  });
}

function setHref(selector, value, fallback = "") {
  $all(selector).forEach((node) => {
    if (hasValue(value)) {
      node.setAttribute("href", value);
      node.removeAttribute("aria-disabled");
      return;
    }

    if (hasValue(fallback)) {
      node.setAttribute("href", fallback);
    } else {
      node.removeAttribute("href");
    }
    node.setAttribute("aria-disabled", "true");
  });
}

function setHidden(selector, shouldHide) {
  $all(selector).forEach((node) => {
    node.hidden = shouldHide;
  });
}

function applyAnnouncement() {
  const banner = document.querySelector("[data-announcement]");
  if (!banner) return;

  if (!config.announcementBannerEnabled || !hasValue(config.announcementBannerText)) {
    banner.hidden = true;
    return;
  }

  banner.hidden = false;
  banner.textContent = config.announcementBannerText;
}

function applyOrderButtons() {
  const orderLinks = $all("[data-square-order]");
  const hasOrderUrl = hasValue(config.squareOrderUrl);

  orderLinks.forEach((link) => {
    link.textContent = hasOrderUrl ? "Order Online" : "Order Link Coming Soon";
    link.setAttribute("href", hasOrderUrl ? config.squareOrderUrl : "/order/");
    link.toggleAttribute("aria-disabled", !hasOrderUrl && link.pathname === window.location.pathname);
  });

  const orderStatus = document.querySelector("[data-order-status]");
  if (orderStatus) {
    orderStatus.textContent = hasOrderUrl
      ? "Online ordering and payment are handled securely through Square."
      : "The Square ordering link is not connected yet. Check back here for the direct order link.";
  }
}

function applyContactLinks() {
  setText("[data-phone-text]", config.phone, "Phone coming soon");
  setText("[data-email-text]", config.email, "Email coming soon");
  setHref("[data-phone-link]", hasValue(config.phone) ? `tel:${config.phone.replace(/[^\d+]/g, "")}` : "");
  setHref("[data-email-link]", hasValue(config.email) ? `mailto:${config.email}` : "");
  setHref("[data-instagram-link]", config.instagramUrl);
  setHref("[data-facebook-link]", config.facebookUrl);

  setHidden("[data-social-note]", hasValue(config.instagramUrl) || hasValue(config.facebookUrl));
}

function applyLocation() {
  const locationText = hasValue(config.truckLocationDescription)
    ? config.truckLocationDescription
    : hasValue(config.businessAddress)
      ? config.businessAddress
      : "Current location and hours are being updated. Check this page again before visiting, or use the Square order link once it is available.";

  setText("[data-location-text]", locationText);
  setText("[data-address-text]", config.businessAddress, "Location being updated");

  const mapLinks = $all("[data-map-link]");
  mapLinks.forEach((link) => {
    const hasMap = hasValue(config.googleMapsUrl);
    link.textContent = hasMap ? "Open Map" : "Map Link Coming Soon";
    if (hasMap) {
      link.setAttribute("href", config.googleMapsUrl);
      link.removeAttribute("aria-disabled");
    } else {
      link.removeAttribute("href");
      link.setAttribute("aria-disabled", "true");
    }
  });

  const hoursLists = $all("[data-hours-list]");
  hoursLists.forEach((list) => {
    list.innerHTML = "";
    if (!Array.isArray(config.hours) || config.hours.length === 0) {
      const item = document.createElement("li");
      item.textContent = "Hours are being updated.";
      list.append(item);
      return;
    }

    config.hours.forEach((entry) => {
      const item = document.createElement("li");
      item.innerHTML = `<span>${entry.day}</span><strong>${entry.time}</strong>`;
      list.append(item);
    });
  });
}

function applyKrobKruaCopy() {
  const directNodes = $all("[data-krob-direct]");
  const softNodes = $all("[data-krob-soft]");

  directNodes.forEach((node) => {
    node.hidden = !config.showKrobKruaLanguage;
  });
  softNodes.forEach((node) => {
    node.hidden = config.showKrobKruaLanguage;
  });
}

function renderMenuPreview() {
  const menuRoot = document.querySelector("[data-menu-preview]");
  if (!menuRoot) return;

  menuRoot.innerHTML = "";
  if (!Array.isArray(menuItems) || menuItems.length === 0) {
    const empty = document.createElement("div");
    empty.className = "notice-card";
    empty.innerHTML =
      "<h2>Menu coming soon</h2><p>Use the Square order link for the current menu and availability once online ordering is connected.</p>";
    menuRoot.append(empty);
    return;
  }

  const groups = menuItems.reduce((acc, item) => {
    const category = item.category || "Menu";
    acc[category] = acc[category] || [];
    acc[category].push(item);
    return acc;
  }, {});

  Object.entries(groups).forEach(([category, items]) => {
    const section = document.createElement("section");
    section.className = "menu-category";
    const heading = document.createElement("h2");
    heading.textContent = category;
    section.append(heading);

    items.forEach((item) => {
      const article = document.createElement("article");
      article.className = "menu-item";
      article.innerHTML = `
        <div>
          <h3>${item.name}</h3>
          <p>${item.description || ""}</p>
          <div class="menu-tags">
            ${item.isPopular ? "<span>Popular</span>" : ""}
            ${item.isVegetarian ? "<span>Vegetarian</span>" : ""}
            ${item.spicyLevel ? `<span>${item.spicyLevel}</span>` : ""}
          </div>
        </div>
        <strong>${item.price || ""}</strong>
      `;
      section.append(article);
    });

    menuRoot.append(section);
  });
}

function applyYear() {
  setText("[data-year]", String(new Date().getFullYear()));
}

applyAnnouncement();
applyOrderButtons();
applyContactLinks();
applyLocation();
applyKrobKruaCopy();
renderMenuPreview();
applyYear();
