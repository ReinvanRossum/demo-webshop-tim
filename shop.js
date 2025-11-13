const PRODUCTS = {
  apple: { name: "Apple", emoji: "🍏" },
  banana: { name: "Banana", emoji: "🍌" },
  lemon: { name: "Lemon", emoji: "🍋" },
  strawberry: { name: "Strawberry", emoji: "🍓" },
  // Strawberry variants for user story 38
  strawberry_stick: { name: "Strawberry on a Stick", emoji: "🍓" },
  strawberry_chocolate: { name: "Chocolate Covered Strawberries", emoji: "🍓🍫" },
  strawberry_cream: { name: "Strawberries with Whipped Cream", emoji: "🍓🥛" },
  // Apple variants
  apple_caramel: { name: "Caramel Apple", emoji: "🍏🍮" },
  apple_cinnamon: { name: "Baked Apple with Cinnamon", emoji: "🍏🥧" },
  apple_slices_pb: { name: "Apple Slices with Peanut Butter", emoji: "🍏🥜" },
  // Banana variants
  banana_choco: { name: "Chocolate-Dipped Banana", emoji: "🍌🍫" },
  banana_split: { name: "Banana Split", emoji: "🍌🍨" },
  banana_smoothie: { name: "Banana Smoothie", emoji: "🍌🥤" },
  // Lemon variants
  lemon_lemonade: { name: "Fresh Lemonade", emoji: "🍋🥤" },
  lemon_tart: { name: "Lemon Tart", emoji: "🍋🥧" },
  lemon_candied: { name: "Candied Lemon Slices", emoji: "🍋🍬" }
};

function getBasket() {
  try {
    const basket = localStorage.getItem("basket");
    if (!basket) return [];
    const parsed = JSON.parse(basket);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn("Error parsing basket from localStorage:", error);
    return [];
  }
}

function addToBasket(product) {
  const basket = getBasket();
  basket.push(product);
  localStorage.setItem("basket", JSON.stringify(basket));
}

function clearBasket() {
  localStorage.removeItem("basket");
}

function renderBasket() {
  const basket = getBasket();
  const basketList = document.getElementById("basketList");
  const cartButtonsRow = document.querySelector(".cart-buttons-row");
  if (!basketList) return;
  basketList.innerHTML = "";
  if (basket.length === 0) {
    basketList.innerHTML = "<li>No products in basket.</li>";
    if (cartButtonsRow) cartButtonsRow.style.display = "none";
    return;
  }
  basket.forEach((product) => {
    const item = PRODUCTS[product];
    if (item) {
      const li = document.createElement("li");
      li.innerHTML = `<span class='basket-emoji'>${item.emoji}</span> <span>${item.name}</span>`;
      basketList.appendChild(li);
    }
  });
  if (cartButtonsRow) cartButtonsRow.style.display = "flex";
}

function renderBasketIndicator() {
  const basket = getBasket();
  let indicator = document.querySelector(".basket-indicator");
  if (!indicator) {
    const basketLink = document.querySelector(".basket-link");
    if (!basketLink) return;
    indicator = document.createElement("span");
    indicator.className = "basket-indicator";
    basketLink.appendChild(indicator);
  }
  if (basket.length > 0) {
    indicator.textContent = basket.length;
    indicator.style.display = "flex";
  } else {
    indicator.style.display = "none";
  }
}

// Call this on page load and after basket changes
if (document.readyState !== "loading") {
  renderBasketIndicator();
} else {
  document.addEventListener("DOMContentLoaded", renderBasketIndicator);
}

// Patch basket functions to update indicator
const origAddToBasket = window.addToBasket;
window.addToBasket = function (product) {
  origAddToBasket(product);
  renderBasketIndicator();
};
const origClearBasket = window.clearBasket;
window.clearBasket = function () {
  origClearBasket();
  renderBasketIndicator();
};

document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.product;
            addToCart(productId);
        });
    });
});

function addToCart(productId) {
    // Haal de huidige winkelwagen op uit localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Voeg het product toe aan de winkelwagen
    cart.push({
        id: productId,
        quantity: 1
    });
    
    // Sla de bijgewerkte winkelwagen op
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Toon een bevestigingsbericht
    alert('Product toegevoegd aan winkelwagen!');
}
