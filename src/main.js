
const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    "Content-Type": "application/json;chartset=utf-8"
  },
  params: {
    'api_key': API_KEY,
  }
});

async function getTrendingPreview(){
  const { data } = await api("trending/movie/day")
  
  const movies = data.results
  console.log(data)
  createMovies(movies, trendingMoviesPreviewList)
}

async function getCategoriesPreview(){
  try{
    const { data } = await api("genre/movie/list")
    const categories = data.genres
  
    console.log("===============")
    console.log(categories)
    
    const categoriesPreviewList = document.querySelector("#categoriesPreview");
    createCategories(categories, categoriesPreviewList, true)
  }catch(error){
    console.log(error)
  }
}

async function getMoviesByCategory(id){
  const { data } = await api("discover/movie",{
    params: {
      with_genres: id,
    }
  })
  const movies = data.results
  console.log(movies)
  createMovies(movies, genericSection)

}

async function getMoviesBySearch(query){
  const { data } = await api("/search/movie",{
    params:{
      query: query
    }
  })
  const movies = data.results
  createMovies(movies, genericSection)
}

async function getTrendingMovie(){
  const { data } = await api("trending/movie/day")
  
  const movies = data.results
  console.log(data)
  createMovies(movies, genericSection)
}

async function getMovieById(id){
  const { data: movie } = await api(`movie/${id}`);
  const movieImgUrl = "https://image.tmdb.org/t/p/w300" + movie.poster_path
  headerSection.style.background=`
  linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%),
  url(${movieImgUrl})`
  
  movieDetailTitle.textContent = movie.title
  movieDetailDescription.textContent = movie.overview
  movieDetailScore.textContent = movie.vote_average
  createCategories(movie.genres, movieDetailCategoriesList,false)
  getSimilarMoviesId(id) 
}

// async function getSimilarMoviesId(id){
//   const { data: movie } = await api(`movie/${id}/similar`)
//   console.log("=======")
//   console.log(movie)
//   console.log("=======")
//   createMovies(movie.results, relatedMoviesContainer)
// }
          
// // utils 
// function createMovies(movies,container){
//   container.innerHTML = "";
//   movies.forEach(movie => {
//     const  movieContainer = document.createElement("div")
//     movieContainer.classList.add("movie-container")

//     const movieImg = document.createElement("img")
//     movieImg.classList.add("movie-img")
//     movieImg.setAttribute("alt", movie.title);
//     movieImg.setAttribute(
//       "src",
//       "https://image.tmdb.org/t/p/w300" + movie.poster_path,
//     );
//     click(movieImg,movie)  

//     movieContainer.append(movieImg)
//     container.append(movieContainer)
//   })
// }

// function createCategories(categories, container, condition){
  
//   container.innerHTML = ""
//   const h2 = document.createElement("H2")
//   h2.textContent = "Categories"
//   h2.classList.add("categoriesPreview-title")
    
//   const article = document.createElement("article")
//   article.classList.add("categoriesPreview-list")
    
//   categories.forEach(category => {
//     const categoryContainer = document.createElement("div");
//     categoryContainer.classList.add("category-container");
  
//     const categoryTitle = document.createElement("h3");
//     categoryTitle.classList.add("category-title")
//     categoryTitle.setAttribute("id", "id"+category.id)
//     categoryTitle.textContent = category.name
//     categoryTitle.addEventListener("click", _ => {
//     location.hash = `category=${category.id}-${category.name}`
//     })

//   categoryContainer.append(categoryTitle)
//   article.append(categoryContainer)
//   condition==true?container.append(h2, article):container.append(article)
  
//   });


// }

// function click(img, movie){
//   img.addEventListener("click",_ => {
//     location.hash = "#movie=" + movie.id
//   })
// }




