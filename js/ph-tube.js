let categoryIdNow = '1000';
const loadAllCategories = async () => {
    const apiUrl = `https://openapi.programming-hero.com/api/videos/categories`;
    const res = await fetch(apiUrl);
    const data = await res.json();
    const categories = data.data;
    displayAllCategories(categories);
}

const displayAllCategories = categories => {
    const categoriesContainer = document.getElementById('categories-container');
    categories.forEach(category => {
        const categoryBtn = document.createElement('button');
        categoryBtn.classList = `btn bg-gray-300 font-bold normal-case`;
        categoryBtn.innerText = `${category.category}`;
        categoriesContainer.appendChild(categoryBtn);
    });
    loadCategory(categoryIdNow);
}

const loadCategory = async categoryId => {
    const apiUrl = `https://openapi.programming-hero.com/api/videos/category/${categoryId}`;
    const res = await fetch(apiUrl);
    const data = await res.json();
    const videos = data.data;
    console.log(videos);
}

loadAllCategories();