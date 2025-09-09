let allPlants = []; // global store

const loadCategory = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json())
    .then(json => displayCategory(json.categories))
    .catch(err => console.error("Error fetching categories:", err));
};

const displayCategory = (categories) => {
  const btnContainer = document.getElementById('btn-category');
  btnContainer.innerHTML = "";

  categories.forEach(category => {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
      <button id="click-active-${category.category_name}"
              onclick="loadItems('${category.category_name}')"
              class="btn btn-soft btn-success text-black">
        ${category.category_name}
      </button>
    `;
    btnContainer.append(btnDiv);
  });
};

loadCategory();

// Remove active from all buttons
const removeActive = () => {
  const categoryButtons = document.querySelectorAll('[id^="click-active-"]');
  categoryButtons.forEach(btn => btn.classList.remove("active"));
};

const loadItems = (categoryName) => {
  const cardContainer = document.getElementById('card-container');

  // Show loading spinner
  cardContainer.innerHTML = `
    <div class="col-span-3 flex justify-center items-center h-40">
      <span class="loading loading-dots loading-md text-green-600"></span>
    </div>
  `;

  fetch("https://openapi.programming-hero.com/api/plants")
    .then(res => res.json())
    .then(json => {
      // filter plants
      const filteredPlants = categoryName
        ? json.plants.filter(p => p.category === categoryName)
        : json.plants;

      // save globally so modal can use it
      allPlants = filteredPlants;

      // remove all active classes
      removeActive();

      // add active class to clicked button
      if (categoryName) {
        const activeBtn = document.getElementById(`click-active-${categoryName}`);
        if (activeBtn) activeBtn.classList.add("active");
      }

      // render
      displayCards(filteredPlants);
    })
    .catch(err => {
      console.error("Error fetching plants:", err);
      cardContainer.innerHTML = `<p class="text-red-500 text-center">Failed to load plants.</p>`;
    });
};

// Display plant cards (securely attaches Add-to-Cart listeners)
const displayCards = (cards) => {
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = "";

  cards.forEach(card => {
    const cardDiv = document.createElement("div");
    cardDiv.className = "bg-white rounded-lg shadow-md overflow-hidden flex flex-col";

    cardDiv.innerHTML = `
      <img class="w-full h-40 object-cover cursor-pointer" src="${card.image}" alt="${card.name}" onclick="openPlantModal('${card.id}')">
      <div class="p-4">
        <h2 onclick="openPlantModal('${card.id}')" class="text-lg font-semibold cursor-pointer hover:text-green-600">
          ${card.name}
        </h2>
        <p class="text-sm text-gray-600 mt-2 flex-grow line-clamp-3">
          ${card.description}
        </p>
        <div class="flex justify-between items-center mt-3">
          <span class="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
            ${card.category}
          </span>
          <span class="text-gray-900 font-semibold">৳${card.price}</span>
        </div>
      </div>
    `;

    // create Add to Cart button safely and attach event listener
    const addBtn = document.createElement("button");
    addBtn.className = "mt-4 w-full bg-green-600 text-white font-semibold py-2 rounded-full hover:bg-green-700 transition";
    addBtn.textContent = "Add to Cart";
    addBtn.addEventListener("click", () => addToCart(card));

    // append the button inside the .p-4 container
    const bodyDiv = cardDiv.querySelector(".p-4");
    bodyDiv.appendChild(addBtn);

    cardContainer.appendChild(cardDiv);
  });
};

loadItems(); // initial load (all items)

let cart = []; // store items in cart

// Add item to cart
const addToCart = (item) => {
  alert(`${item.name} added to cart!`); // show alert before adding

  // Check if item already exists in cart
  const existingItem = cart.find(i => i.id === item.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  updateCartUI();
};

// Remove item from cart
const removeFromCart = (id) => {
  cart = cart.filter(item => item.id !== id);
  updateCartUI();
};

// Update cart UI
const updateCartUI = () => {
  const cartList = document.getElementById("cart-list");
  const cartTotal = document.getElementById("cart-total");

  cartList.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    const li = document.createElement("li");
    li.className = "flex justify-between items-center bg-green-50 p-2 rounded";

    li.innerHTML = `
      <div>
        <span class="font-semibold">${item.name}</span>
        <p class="text-sm text-gray-600">৳${item.price} × ${item.quantity}</p>
      </div>
      <button class="text-red-500 hover:text-red-700">×</button>
    `;

    // attach remove handler for this item
    li.querySelector("button").addEventListener("click", () => removeFromCart(item.id));

    cartList.appendChild(li);
  });

  cartTotal.textContent = `৳${total}`;
};

function openPlantModal(id) {
  const card = allPlants.find(p => String(p.id) === String(id));
  if (!card) return console.error("Plant not found:", id);

  document.getElementById("modal-title").innerText = card.name;
  document.getElementById("modal-image").src = card.image;
  document.getElementById("modal-image").alt = card.name;
  document.getElementById("modal-category").innerText = card.category;
  document.getElementById("modal-price").innerText = `৳${card.price}`;
  document.getElementById("modal-description").innerText = card.description;

  document.getElementById("plantModal").showModal();
}
