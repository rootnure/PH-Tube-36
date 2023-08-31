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
    displayCategory(videos);
}

const displayCategory = videos => {
    const videosContainer = document.getElementById('videos-container');
    videos.forEach(video => {
        const { thumbnail, title, authors, others } = video;
        const [author] = authors;
        const videoDiv = document.createElement('div');
        videoDiv.innerHTML = `
        <div class="card bg-base-100 rounded">
            <figure class="h-40"><img src="${thumbnail}" alt="${title}" class="w-full"></figure>
            <div class="card-body px-1 py-4 grid grid-cols-12 gap-x-4">
                <div class="col-span-2">
                    <img src="${author.profile_picture}" alt="${author.profile_name}" class="w-full rounded-full h-9">
                </div>
                <div class="col-span-10 flex flex-col gap-y-1">
                    <h3 class="text-base font-bold">${title}</h3>
                    <p class="text-sm text-gray-400">${author.profile_name}${author.verified ? ` <i class="fa-solid fa-square-check text-blue-500"></i>` : ''}</p>
                    <p class="text-sm text-gray-400">${others.views} views</p>
                </div>
            </div>
        </div>
        `;
        videosContainer.appendChild(videoDiv);
    });
}

loadAllCategories();