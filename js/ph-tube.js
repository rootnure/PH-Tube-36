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
        if (categories.indexOf(category) === 0) {
            categoryBtn.classList.add('bg-red-500', 'text-white');
            categoryBtn.classList.remove('bg-gray-300');
        }
        categoryBtn.setAttribute('onclick', `handleActiveTab(this, ${category.category_id})`);
        categoryBtn.innerText = `${category.category}`;
        categoriesContainer.appendChild(categoryBtn);
    });
    loadCategoryResult(categoryIdNow);
}

const loadCategoryResult = async () => {
    toggleLoadingSpinner(true);
    const categoryId = categoryIdNow;
    const apiUrl = `https://openapi.programming-hero.com/api/videos/category/${categoryId}`;
    const res = await fetch(apiUrl);
    const data = await res.json();
    const videos = data.data;
    displayCategoryResult(videos);
}

const displayCategoryResult = videos => {
    const videosContainer = document.getElementById('videos-container');
    // clearing the previous results from website
    videosContainer.textContent = '';
    // no data check & handle
    if(videos.length < 1) {
        videosContainer.innerHTML = `
            <div class="md:col-span-2 lg:col-span-4 h-96 flex justify-center">
                <div class="flex flex-col gap-4 justify-center">
                    <div class="flex justify-center">
                        <image src="./images/icon.png" alt="No Video Found">
                    </div>
                    <h1 class="text-4xl font-bold text-center">Oops!!! No video found...</h1>
                </div>
            </div>
        `;
        toggleLoadingSpinner(false);
        return;
    }
    // checking for sorting
    if (isSortByView) {
        videos.sort((v1, v2) => (parseFloat(v1.others.views) < parseFloat(v2.others.views)) ? 1 : ((parseFloat(v2.others.views) < parseFloat(v1.others.views)) ? -1 : 0));
    }
    videos.forEach(video => {
        const { thumbnail, title, authors, others } = video;
        const [author] = authors;
        const published = parseInt(+others.posted_date / 60);
        const videoDiv = document.createElement('div');
        videoDiv.innerHTML = `
        <div class="card group hover:cursor-pointer bg-base-100 rounded">
            <figure class="h-52 relative">
                <img src="${thumbnail}" alt="${title}" class="w-full min-h-full group-hover:scale-105 duration-100 ">
                ${published || published > 0 ? `<p class="absolute bottom-2 right-2 bg-black px-2 py-1 text-white rounded-md text-xs">${parseInt(published / 60)}hrs ${published % 60} min ago</p>` : ''}
            </figure>
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
    toggleLoadingSpinner(false);
}

const handleActiveTab = (target, categoryId) => {
    const activeElement = target;
    const neighbors = target.parentNode.childNodes;
    neighbors.forEach(neighbor => {
        if (neighbor?.classList?.value) {
            if (neighbor.classList.value.includes('bg-red-500')) {
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
    loadCategoryResult();
}

const handleSortByView = () => {
    isSortByView = true;
    loadCategoryResult();
}

const toggleLoadingSpinner = isVisible => {
    const spinner = document.getElementById('loading-spinner');
    if(isVisible) {
        spinner.classList.remove('hidden');
    }
    else {
        spinner.classList.add('hidden');
    }
}

loadAllCategories();