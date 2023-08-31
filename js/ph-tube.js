const loadAllCategories = async () => {
    const apiUrl = `https://openapi.programming-hero.com/api/videos/categories`;
    const res = await fetch(apiUrl);
    const data = await res.json();
    console.log(data);
}

loadAllCategories();