// data 
const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    "Content-Type": "application/json;chartset=utf-8"
  },
  params: {
    'api_key': API_KEY,
  }
});

function favoriteMoviesList(){
  const item = JSON.parse(localStorage.getItem("favorite_movies"))
  let movies;
  return item ? movies = item : movies = {}
}

function favoriteMovies(movie){
  const favoriteMovies = favoriteMoviesList()
  // console.log(favoriteMovies)
  favoriteMovies[movie.id] ? 
    favoriteMovies[movie.id] = undefined:
    favoriteMovies[movie.id] = movie;
  localStorage.setItem("favorite_movies", JSON.stringify(favoriteMovies))
}

function getFavoriteMovies(){
  const favoriteMovies = favoriteMoviesList()
  const moviesArray = Object.values(favoriteMovies)
  createMovies(moviesArray, containerFavoriteMovies, {
    lazyLoad: true,
    clean: true,
  });
}

async function getTrendingPreview(){
  const { data } = await api("trending/movie/day")
  
  const movies = data.results
  console.log(data)
  createMovies(movies, trendingMoviesPreviewList, true)
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
  maxPage = data.total_pages
  createMovies(movies, genericSection, true)

  // const btnLoadMore = document.createElement("button")
  // btnLoadMore.innerText = "Load More "
  // btnLoadMore.addEventListener("click", getPaginatedMoviesCategories)
  // genericSection.append(btnLoadMore)
}

function getPaginatedMoviesByCategory(id){
  return async function (){
    const { scrollTop,
      clientHeight,
      scrollHeight,} = document.documentElement

    const scrollIsBotton = 
    (scrollTop + clientHeight >= scrollHeight - 50)

    const pageIsNotMax = page < maxPage

    if(scrollIsBotton && pageIsNotMax){
      page++; // it's the button with scroll
      const { data } = await api("discover/movie",{
        params:{
          with_genres: id,
          page,
        }
      })
      const movies = data.results
      createMovies(
        movies, 
        genericSection,
        {
          lazyLoad: true,
          clean: false,
        }
      )
    } 
  }

  // const btnLoadMore = document.createElement("button")
  // btnLoadMore.innerText = "Load More "
  // btnLoadMore.addEventListener("click", ()=>{
  //   getPaginatedMoviesTrending();
  //   btnLoadMore.classList.add("inactive")
  // })
  

  // genericSection.append(btnLoadMore)
  // const deleteBtn = document.getElementById("#LoadMode")
  // console.log(deleteBtn)
}

async function getMoviesBySearch(query){
  const { data } = await api("search/movie",{
    params:{
      query: query
    }
  })
  const movies = data.results
  maxPage = data.total_pages
  console.log(data.total_pages)
  createMovies(movies, genericSection)
}

function getPaginatedMoviesBySearch(query){
  return async function (){
    const { scrollTop,
      clientHeight,
      scrollHeight,} = document.documentElement

const scrollIsBotton = 
(scrollTop + clientHeight >= scrollHeight - 50)

const pageIsNotMax = page < maxPage

if(scrollIsBotton && pageIsNotMax){
  page++; // it's the button with scroll
  const { data } = await api("search/movie",{
    params:{
      query,
      page,
    }
  })
  const movies = data.results

  createMovies(
    movies, 
    genericSection,
    {
      lazyLoad: true,
      clean: false,
    }
  )
  }
  
}

  // const btnLoadMore = document.createElement("button")
  // btnLoadMore.innerText = "Load More "
  // btnLoadMore.addEventListener("click", ()=>{
  //   getPaginatedMoviesTrending();
  //   btnLoadMore.classList.add("inactive")
  // })
  

  // genericSection.append(btnLoadMore)
  // const deleteBtn = document.getElementById("#LoadMode")
  // console.log(deleteBtn)
}

async function getTrendingMovie(){
  const { data } = await api("trending/movie/day")
  const movies = data.results
  maxPage = data.total_pages
  
  createMovies(movies, genericSection, {
    lazyLoad: true,
    clean: true
  });
  // const btnLoadMore = document.createElement("button")
  // btnLoadMore.innerText = "Load More "
  // btnLoadMore.setAttribute("id", "loadMore")
  // btnLoadMore.addEventListener("click", ()=> {
  //   getPaginatedMoviesTrending()
  //   btnLoadMore.classList.add("inactive")
  // })
  // genericSection.append(btnLoadMore)
  
}

async function getPaginatedMoviesTrending(){

  const { scrollTop,
        clientHeight,
        scrollHeight,} = document.documentElement
  
  const scrollIsBotton = 
  (scrollTop + clientHeight >= scrollHeight - 50)

  const pageIsNotMax = page < maxPage

  if(scrollIsBotton && pageIsNotMax){
    page++; // it's the button with scroll
    const { data } = await api("trending/movie/day",{
      params:{
        page: page,
      }
    })
    const movies = data.results
    console.log(data)

    createMovies(
      movies, 
      genericSection,
      {
        lazyLoad: true,
        clean: false,
      }
    )
  }

  // const btnLoadMore = document.createElement("button")
  // btnLoadMore.innerText = "Load More "
  // btnLoadMore.addEventListener("click", ()=>{
  //   getPaginatedMoviesTrending();
  //   btnLoadMore.classList.add("inactive")
  // })
  

  // genericSection.append(btnLoadMore)
  // const deleteBtn = document.getElementById("#LoadMode")
  // console.log(deleteBtn)
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

async function getSimilarMoviesId(id){
  const { data: movie } = await api(`movie/${id}/similar`)
  console.log("=======")
  console.log(movie)
  console.log("=======")
  createMovies(movie.results, relatedMoviesContainer, true)
  // relatedMoviesContainer.classList.add("trendingPreview-movieList")
}

          
// // utils 
function createMovies(movies, container, {
  lazyLoad = false,
  clean = true,
} = {}){
  if(clean){
    container.innerHTML = "";
  }
  movies.forEach(movie => {
    const  movieContainer = document.createElement("div")
    movieContainer.classList.add("movie-container")
    const movieImg = document.createElement("img")
    movieImg.classList.add("movie-img")
    movieImg.setAttribute("alt", movie.title);
    movieImg.setAttribute(
      lazyLoad ? "data-img":"src",
      "https://image.tmdb.org/t/p/w300" + movie.poster_path,
    );
    if(lazyLoad){
      lazyLoader.observe(movieImg)
    }

    if(movieImg.src.includes("null")){
      movieImg.src = "https://www.adslzone.net/app/uploads-adslzone.net/2020/11/Error.png?x=480&y=375&quality=40"
      // movieImg.classList.add("tamaño-img")
    }
    
    click(movieImg,movie)  
    const favoriteBtn = document.createElement("button");
    favoriteBtn.classList.add("favorite-btn")
    favoriteMoviesList()[movie.id] && favoriteBtn.classList.toggle("movie-btn--favorite")
    favoriteBtn.addEventListener("click", () => {
      favoriteBtn.classList.toggle("movie-btn--favorite")
      favoriteMovies(movie)
      getFavoriteMovies()
    })
    
    // movieImg.append(favoriteBtn)
    movieContainer.append(movieImg, favoriteBtn)
    container.append(movieContainer)
    
  })
  
}

function createCategories(categories, container, condition){
  container.innerHTML = ""
  const h2 = document.createElement("H2")
  h2.textContent = "Categories"
  h2.classList.add("categoriesPreview-title")
  const article = document.createElement("article")
  article.classList.add("categoriesPreview-list")
  categories.forEach(category => {
    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category-container");
    const categoryTitle = document.createElement("h3");
    categoryTitle.classList.add("category-title")
    categoryTitle.setAttribute("id", "id"+category.id)
    categoryTitle.textContent = category.name
    categoryTitle.addEventListener("click", _ => {
    location.hash = `category=${category.id}-${category.name}`
    })
  categoryContainer.append(categoryTitle)
  article.append(categoryContainer)
  condition==true?container.append(h2, article):container.append(article)
  });
}

function click(img, movie){
  img.addEventListener("click",_ => {
    location.hash = "#movie=" + movie.id
  })
}

const lazyLoader = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // console.log(entry.target.setAttribute)
    if(entry.isIntersecting){
      const url = entry.target.getAttribute("data-img")
      entry.target.setAttribute("src", url)
    }
  })
})




