document.getElementById("spner").style.display = "none"
const loadAllCategory = async()=>{
    
    const response = await fetch("https://openapi.programming-hero.com/api/news/categories");
    const data = await response.json();
    return data;
}
const loadAllMaun = async() =>{
   const data = await loadAllCategory();
   const listMaun = data.data.news_category;

   const menu = document.getElementById('all-menu');
   for(const list of listMaun){
    
    const li = document.createElement("li");
    li.innerHTML = `<button onclick="catagories('${list.category_id}')">${list.category_name}</button>
    `;
    menu.appendChild(li);
    
   }
}
loadAllMaun();

// maun part end 

const catagories = async(categoryId) =>{
    document.getElementById("spner").style.display = "block"
const category = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`);
    const data = await category.json();
    const newsItems = data.data;
    countString = document.getElementById('count-number').innerText = newsItems.length;

    const newsList = document.getElementById('all-data');
    newsList.innerHTML = '';
    newsItems.forEach(singleNews => {
        document.getElementById("spner").style.display = "none" 
        const {title,total_view, author, details, thumbnail_url, _id} = singleNews
        const newsCard = document.createElement('div');
        newsCard.classList.add('col')
        newsCard.innerHTML=`
      <div class="card lg:card-side bg-base-100 shadow-xl">
      <figure><img src="${thumbnail_url}" class="h-84 w-64 p-4" alt="Movie"></figure>
        <div class="card-body">
            <h2 class="card-title text-purple-500">${title.length > 80 ? title.slice(0,50)+ '....' : title}</h2>
            <p>${details.length > 900 ? details.slice(0,500)+ '.....' : details}</p>
                <div class="flex flex-row items-center">
                <div><p><img src="${author.img}" class="h-20 w-20 p-4 rounded-full"</p></div>
                <div class="basis-1/4 "><p>${author.name ? author.name : 'N/A'}</p></div>
                <div class="ps-6"><svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" stroke="#000" stroke-width="2" d="M12,21 C7,21 1,16 1,12 C1,8 7,3 12,3 C17,3 23,8 23,12 C23,16 17,21 12,21 Z M12,7 C9.23875,7 7,9.23875 7,12 C7,14.76125 9.23875,17 12,17 C14.76125,17 17,14.76125 17,12 C17,9.23875 14.76125,7 12,7 L12,7 Z"/>
                </svg></div>
                <div class="basis-1/2 p-4">Total view ${total_view ? total_view : 'N/A'}</div>
                <label onclick="newsDetail('${_id}')" for="my-modal-5" class="btn modal-button">more...</label>
                
                </div>
                
            </div>
        </div>
        </div>
        `;
        newsList.appendChild(newsCard);
    });
    
}

const newsDetail = (newsId) =>{
    fetch(`https://openapi.programming-hero.com/api/news/${newsId}`)
    .then(res => res.json())
    .then (data => modalData(data))
}
const modalData = (details)=>{
    const modalBody = document.getElementById('modal-body');;
    modalBody.innerHTML =`
    <div>
            <h1 class="font-bold text-lg text-purple-700 text-3xl">${details.data[0].title}</h1>     
            <h3 class="font-bold text-lg">Writer Name: ${details.data[0].author.name ? details.data[0].author.name : 'N/A'}</h3>
            <h3 class="font-bold text-lg">published_date: ${details.data[0].author.published_date}</h3>
            <div><p><img src="${details.data[0].thumbnail_url}" class=""</p></div>
            <h1 class="font-bold text-lg">News: ${details.data[0].details}</h1>
            <h1 class="font-bold text-lg">Total view: ${details.data[0].total_view ? details.data[0].total_view : 'N/A'}</h1>
            <label for="my-modal-5" class="btn">cancel</label>
    </div>
    `;
}

