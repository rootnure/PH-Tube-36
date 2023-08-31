const loadAllCategories = async () => {
    const apiUrl = `https://openapi.programming-hero.com/api/videos/categories`;
    const res = await fetch(apiUrl);
    const data = await res.json();
    const categories = data.data;
    displayAllCategories(categories);
}

const displayAllCategories = categories => {
    console.log(categories);
}

loadAllCategories();