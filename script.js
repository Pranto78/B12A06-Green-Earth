
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
        <button class="btn btn-soft btn-success">${category.category_name}</button>

        `;
        btnContainer.append(btnDiv);
    });
};

loadCategory();




// {
// "id": 1,
// "category_name": "Fruit Tree",
// "small_description": "Trees that bear edible fruits like mango, guava, and jackfruit."
// },