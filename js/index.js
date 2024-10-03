const loadCategoriesData = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategoriesData(data.categories))
    .catch((err) => console.log(err));
};
const loadVideosData = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideosData(data.videos))
    .catch((err) => console.log(err));
};
const btnRemoveClass = () => {
  const categoriesBtn = document.getElementsByClassName("categories-button");
  for (let category of categoriesBtn) {
    console.log(category);
    category.classList.remove("bg-red-500");
    category.classList.remove("text-white");
  }
};

const categorisCardShow = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      displayVideosData(data.category);
      btnRemoveClass();
      const isActiveBtn = document.getElementById(`btn-${id}`);
      isActiveBtn.classList.add("bg-red-500");
      isActiveBtn.classList.add("text-white");
      console.log(isActiveBtn);
    })
    .catch((err) => console.log(err));
};
const displayCategoriesData = (categories) => {
  const categoriesBtnSection = document.getElementById("categories-btn");
  categories.forEach((item) => {
    const categoryItem = document.createElement("div");
    categoryItem.innerHTML = `
    <button 
    id="btn-${item.category_id}" 
    onClick="categorisCardShow(${item.category_id})"  
    class="btn  text-lg px-4  categories-button" 
    >
    ${item.category}
    </button>
    `;
    // console.log(categoryItem);
    categoriesBtnSection.appendChild(categoryItem);
  });
};
function timeOutfun(time) {
  const hours = parseInt(time / 60 / 60);
  let second = time % 3600;
  const minute = parseInt(second / 60);
  second = second % 60;
  return `${hours} hrs ${minute} min ${second} sec Ago`;
}
const displayVideosData = (videos) => {
  const videosCardSection = document.getElementById("videos-card-section");
  videosCardSection.innerHTML = "";

  if (videos.length == 0) {
    videosCardSection.classList.remove("grid");
    videosCardSection.innerHTML = `
    <div class="flex flex-col gap-10 justify-center items-center">
    <img src="assets/Icon.png"/>
    <h2 class="text-3xl font-bold">NO DATA HERE </h2>
     </div>
    `;
  } else {
    videosCardSection.classList.add("grid");
  }
  videos.forEach((item) => {
    const creatCard = document.createElement("div");
    creatCard.classList = "card   card-compact";
    creatCard.innerHTML = `
<figure class="h-[200px] relative">
    <img
      class="hover:opacity-60  w-full h-full  object-cover"
      src=${item.thumbnail}
    />

     ${
       item?.others?.posted_date
         ? `<span class="absolute bg-slate-900 bg-opacity-50 text-white px-3 py-1  rounded right-3 bottom-3">
         ${timeOutfun(item?.others?.posted_date)}
       </span>`
         : ""
     }
</figure>
<div class="flex gap-4 px-0 py-2">
  <div >
  <img 
   class='w-10 h-10 rounded-full object-cover'
    src=${item?.authors[0].profile_picture}
   />
  </div>
  <div>
     <h2 class="card-title">${item.title}</h2>
     <div class="flex items-center gap-2">
     <p>${item?.authors[0].profile_name}</p>
${
  item?.authors[0].verified == false //|| item?.authors[0].verified === ""
    ? ""
    : `
    <img 
     class="w-5 h-5"
     src="https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&
     color=000000"/>
      
    `
}
  
     </div>
  </div>
 </div>
    `;
    videosCardSection.appendChild(creatCard);

    // console.log(item?.others);
  });
};

loadCategoriesData();
loadVideosData();
