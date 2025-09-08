
const loadCategory = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then(res => res.json())
        .then(json => displayCategory(json.categories))
        // .catch(err => console.error("Error fetching categories:", err));
};

const displayCategory = (categories) => {
    const btnContainer = document.getElementById('btn-category');
    btnContainer.innerHTML = "";

    categories.forEach(category => {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button id="click-active-${category.category_name}" onclick="loadItems('${category.category_name}')" class="btn btn-soft btn-success text-black">${category.category_name}</button>

        `;
        btnContainer.append(btnDiv);
    });
};


loadCategory();



// Cards

// Remove active from all buttons
const removeActive = () => {
  const categoryButtons = document.querySelectorAll('[id^="click-active-"]');
  categoryButtons.forEach(btn => btn.classList.remove("active"));
};

const loadItems = (categoryName) => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then(res => res.json())
    .then(json => {
      // remove all active classes
      removeActive();

      // add active class to clicked button
      if (categoryName) {
        const activeBtn = document.getElementById(`click-active-${categoryName}`);
        if (activeBtn) activeBtn.classList.add("active");
      }

      // filter plants
      const filteredPlants = categoryName
        ? json.plants.filter(p => p.category === categoryName)
        : json.plants;

      displayCards(filteredPlants);
    })
    .catch(err => console.error("Error fetching plants:", err));
};



// Display plant cards
const displayCards = (cards) => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = "";

    cards.forEach(card => {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add(
            "bg-white", "rounded-lg", "shadow-md", "overflow-hidden",
            "flex", "flex-col");

        cardDiv.innerHTML = `
            <img class="w-full h-40 object-cover" src="${card.image}" alt="${card.name}">
            <div class="p-4">
              <h2 class="text-lg font-semibold">${card.name}</h2>
              <p class="text-sm text-gray-600 mt-2 flex-grow line-clamp-3">
                ${card.description}
              </p>
              <div class="flex justify-between items-center mt-3">
                <span class="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                  ${card.category}
                </span>
                <span class="text-gray-900 font-semibold">৳${card.price}</span>
              </div>
              <button
                class="mt-4 w-full bg-green-600 text-white font-semibold py-2 rounded-full hover:bg-green-700 transition">
                Add to Cart
              </button>
            </div>
        `;

        cardContainer.append(cardDiv);
    });
};

loadItems();


// "id": 1,
// "image": "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg",
// "name": "Mango Tree",
// "description": "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals.",
// "category": "Fruit Tree",
// "price": 500
// },



// {
// "id": 1,
// "category_name": "Fruit Tree",
// "small_description": "Trees that bear edible fruits like mango, guava, and jackfruit."
// },