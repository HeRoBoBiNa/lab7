"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("order-form");
    const product = document.getElementById("product");
    const quantity = document.getElementById("quantity");
    const error = document.getElementById("quantity-error");
    const result = document.getElementById("order-result");
    const positiveInteger = /^[1-9][0-9]*$/;

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const input = quantity.value.trim();
        result.hidden = true;
        error.hidden = true;
        quantity.removeAttribute("aria-invalid");

        if (!positiveInteger.test(input) || !Number.isSafeInteger(Number(input))) {
            error.textContent = "Введите целое положительное количество без букв и других символов.";
            error.hidden = false;
            quantity.setAttribute("aria-invalid", "true");
            return;
        }

        const count = parseInt(input, 10);
        const price = parseInt(product.value, 10);
        const total = count * price;

        if (!Number.isSafeInteger(total)) {
            error.textContent = "Слишком большое количество товара.";
            error.hidden = false;
            quantity.setAttribute("aria-invalid", "true");
            return;
        }

        result.textContent = "Стоимость заказа: " + total.toLocaleString("ru-RU") + " ₽";
        result.hidden = false;
    });

    quantity.addEventListener("input", function () {
        error.hidden = true;
        result.hidden = true;
        quantity.removeAttribute("aria-invalid");
    });

    product.addEventListener("change", function () {
        result.hidden = true;
    });
});

// Лабораторная №6. Расчёт происходит при любом изменении формы.
document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    const serviceForm = document.getElementById("service-form");
    const serviceQuantity = document.getElementById("service-quantity");
    const serviceOptionContainer = document.getElementById("service-option-container");
    const servicePropertyContainer = document.getElementById("service-property-container");
    const serviceOption = document.getElementById("service-option");
    const serviceProperty = document.getElementById("service-property");
    const serviceDelivery = document.getElementById("service-delivery");
    const serviceError = document.getElementById("service-quantity-error");
    const serviceResult = document.getElementById("service-result");
    const validQuantity = /^[1-9][0-9]*$/;
    const printPrices = {standard: 100, color: 180, premium: 250};

    function calculateService() {
        const selectedType = serviceForm.querySelector('input[name="service-type"]:checked').value;
        const input = serviceQuantity.value.trim();
        const count = Number(input);

        serviceOptionContainer.hidden = selectedType !== "print";
        servicePropertyContainer.hidden = !serviceDelivery.checked;
        if (!serviceDelivery.checked) {
            serviceProperty.checked = false;
        }
        serviceError.hidden = true;
        serviceQuantity.removeAttribute("aria-invalid");

        if (!validQuantity.test(input) || !Number.isSafeInteger(count)) {
            serviceError.textContent = "Введите целое положительное количество.";
            serviceError.hidden = false;
            serviceQuantity.setAttribute("aria-invalid", "true");
            serviceResult.textContent = "Стоимость услуги: —";
            return;
        }

        let total = selectedType === "basic" ? 500 * count : printPrices[serviceOption.value] * count;
        if (serviceDelivery.checked) {
            total += 300 * count + (serviceProperty.checked ? 200 : 0);
        }

        if (!Number.isSafeInteger(total)) {
            serviceError.textContent = "Количество слишком велико.";
            serviceError.hidden = false;
            serviceResult.textContent = "Стоимость услуги: —";
            return;
        }

        serviceResult.textContent = "Стоимость услуги: " + total.toLocaleString("ru-RU") + " ₽";
    }

    serviceForm.addEventListener("input", calculateService);
    serviceForm.addEventListener("change", calculateService);
    calculateService();
});

// Лабораторная №7: рейтинг собак, переход по группам 8–6, 5–3, 2–1.
document.addEventListener("DOMContentLoaded", function () {
    "use strict";
    const track = document.getElementById("gallery-track");
    const slides = track.querySelectorAll(".gallery-slide");
    const prev = document.getElementById("gallery-prev");
    const next = document.getElementById("gallery-next");
    const pager = document.getElementById("gallery-pager");
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    let page = 0;

    function updateGallery() {
        const visible = mobileQuery.matches ? 1 : 3;
        const pages = Math.ceil(slides.length / visible);
        page = Math.max(0, Math.min(page, pages - 1));
        const startIndex = page * visible;
        track.style.transform = "translateX(-" + (startIndex * 100 / visible) + "%)";
        pager.textContent = "Страница " + (page + 1) + " из " + pages;
        prev.disabled = page === 0;
        next.disabled = page === pages - 1;
    }

    prev.addEventListener("click", function () {
        page -= 1;
        updateGallery();
    });
    next.addEventListener("click", function () {
        page += 1;
        updateGallery();
    });
    mobileQuery.addEventListener("change", function () {
        page = 0;
        updateGallery();
    });
    updateGallery();
});
