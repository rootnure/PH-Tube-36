let categoryIdNow = '1000';
let isSortByView = false;
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
        categoryBtn.classList = `btn font-bold hover:text-black normal-case bg-gray-300`;
        if(categories.indexOf(category) === 0) {
            categoryBtn.classList.add('bg-red-500', 'text-white');
            categoryBtn.classList.remove('bg-gray-300');
        }
        categoryBtn.setAttribute('onclick', `handleActive(this, ${category.category_id})`);
        categoryBtn.innerText = `${category.category}`;
        categoriesContainer.appendChild(categoryBtn);
    });
    loadCategory(categoryIdNow);
}

const loadCategory = async () => {
    const categoryId = categoryIdNow;
    const apiUrl = `https://openapi.programming-hero.com/api/videos/category/${categoryId}`;
    const res = await fetch(apiUrl);
    const data = await res.json();
    const videos = data.data;
    displayCategory(videos);
}

const displayCategory = videos => {
    const videosContainer = document.getElementById('videos-container');
    // clearing the previous results from website
    videosContainer.textContent = '';
    // checking for sorting
    if(isSortByView) {
        videos.sort((v1, v2) => (parseFloat(v1.others.views) < parseFloat(v2.others.views)) ? 1 : ((parseFloat(v2.others.views) < parseFloat(v1.others.views)) ? -1 : 0));
    }
    videos.forEach(video => {
        const { thumbnail, title, authors, others } = video;
        const [author] = authors;
        const videoDiv = document.createElement('div');
        videoDiv.innerHTML = `
        <div class="card hover:cursor-pointer hover:scale-105 duration-100 bg-base-100 rounded">
            <figure class="h-52 md:h-40"><img src="${thumbnail}" alt="${title}" class="w-full"></figure>
            <div class="card-body px-1 py-4 grid grid-cols-12 gap-x-4">
                <div class="col-span-2">
                    <img src="${author.profile_picture}" alt="${author.profile_name}" class="w-12 h-12 rounded-[100%]">
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

const handleActive = (target, categoryId) => {
    const activeElement = target;
    const neighbors = target.parentNode.childNodes;
    neighbors.forEach(neighbor => {
        if(neighbor?.classList?.value) {
            if(neighbor.classList.value.includes('bg-red-500')) {
                neighbor.classList.remove('bg-red-500', 'text-white');
                neighbor.classList.add('bg-gray-300');
            }
        }
        else {
            return;
        }
    });
    activeElement.classList.add('bg-red-500', 'text-white');
    activeElement.classList.remove('bg-gray-300');
    categoryIdNow = categoryId;
    isSortByView = false;
    loadCategory();
}

const handleSortByView = () => {
    isSortByView = true;
    loadCategory();
}

loadAllCategories();