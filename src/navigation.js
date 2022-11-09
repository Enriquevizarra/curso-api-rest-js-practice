searchFormBtn.addEventListener("click", _ => {
  location.hash = `#search=${searchFormInput.value}`
})

trendingBtn.addEventListener("click", _ => {
  location.hash = "#trends="
})

window.addEventListener(
  'DOMContentLoaded',
  () => {
      navigator();
      // Agregando un estado de carga inical
      window.history.pushState({ loadUrl: window.location.href }, null, '');
  },
  false,
);

arrowBtn.addEventListener("click", _ => {
  console.log(location.hash)
  const statedLoad = window.history.state ? window.history.state.loadUrl : "";
  if(statedLoad.includes("#")){
    window.location.hash="";
  } else {
    window.history.back();
  }
  window.history.back();
})


window.addEventListener("DOMContentLoaded", navigator, false)
window.addEventListener("hashchange", navigator, false)

function navigator(){
  console.log({ location })
  if(location.hash.startsWith("#trends")){
    trendsPage();
  } else if(location.hash.startsWith("#search=")){
    searchPage();
  } else if(location.hash.startsWith("#movie=")){
    movieDetailsPage();
  } else if(location.hash.startsWith("#category=")){
    categoriesPages();
  } else{
    homePage();
  }
  document.documentElement.scrollTop = 0
}

// function homePage(){
//   console.log("Home!!!")
  
//   headerSection.classList.remove("header-container--long")
//   headerSection.style.background = "";
//   arrowBtn.classList.add("inactive")
//   arrowBtn.classList.remove("header-arrow--white")
//   headerTitle.classList.remove("inactive")
//   headerCategoryTitle.classList.add("inactive")
//   searchForm.classList.remove("inactive")
  
//   trendingPreviewSection.classList.remove("inactive")
//   categoriesPreviewSection.classList.remove("inactive")
//   genericSection.classList.add("inactive")
//   movieDetailSection.classList.add("inactive")
  
//   getTrendingPreview()
//   getCategoriesPreview()
// }
// function trendsPage(){
//   console.log("trends!!!")
  
//   headerSection.classList.remove("header-container--long")
//   headerSection.style.background = "";
//   arrowBtn.classList.remove("inactive")
//   arrowBtn.classList.remove("header-arrow--white")
//   headerTitle.classList.add("inactive")
//   headerCategoryTitle.classList.remove("inactive")
//   searchForm.classList.add("inactive")

//   trendingPreviewSection.classList.add("inactive")
//   categoriesPreviewSection.classList.add("inactive")
//   genericSection.classList.remove("inactive")
//   movieDetailSection.classList.add("inactive")
//   headerCategoryTitle.innerHTML = "Trending"
//   getTrendingMovie()
// }
// function searchPage(){
//   console.log("search!!!")
  
//   headerSection.classList.remove("header-container--long")
//   headerSection.style.background = "";
//   arrowBtn.classList.remove("inactive")
//   arrowBtn.classList.remove("header-arrow--white")
//   headerTitle.classList.add("inactive")
//   headerCategoryTitle.classList.add("inactive")
//   searchForm.classList.remove("inactive")

//   trendingPreviewSection.classList.add("inactive")
//   categoriesPreviewSection.classList.add("inactive")
//   genericSection.classList.remove("inactive")
//   movieDetailSection.classList.add("inactive")

//   // [search, buscado]
//   const [ _, query ] = location.hash.split("=")
//   getMoviesBySearch(query)
// }
// function categoriesPages(){
//   console.log("categories!!!")
//   headerSection.classList.remove("header-container--long")
//   headerSection.style.background = "";
//   arrowBtn.classList.remove("inactive")
//   arrowBtn.classList.remove("header-arrow--white")
//   headerTitle.classList.add("inactive")
//   headerCategoryTitle.classList.remove("inactive")
//   searchForm.classList.add("inactive")

//   trendingPreviewSection.classList.add("inactive")
//   categoriesPreviewSection.classList.add("inactive")
//   genericSection.classList.remove("inactive")
//   movieDetailSection.classList.add("inactive")


//   const [_, categoryData] = location.hash.split("=")  
//   // => ["category" , name ]
//   const [categoryId, categoryName] = categoryData.split("-")
//   headerCategoryTitle.textContent = categoryName.replace(/%20/," ")
  
//   console.log(categoryName)
//   getMoviesByCategory(categoryId);

// }

// function movieDetailsPage(){
//   console.log("moviedetail!!!")
  
//   headerSection.classList.add("header-container--long")
  
//   arrowBtn.classList.remove("inactive")
//   arrowBtn.classList.add("header-arrow--white")
//   headerTitle.classList.add("inactive")
//   headerCategoryTitle.classList.add("inactive")
//   searchForm.classList.add("inactive")
  
//   trendingPreviewSection.classList.add("inactive")
//   categoriesPreviewSection.classList.add("inactive")
//   genericSection.classList.add("inactive")
//   movieDetailSection.classList.remove("inactive")
// //      movie , idMovie
//   const [ _, idMovie ] = location.hash.split("=")
//   getMovieById(idMovie);

// }

