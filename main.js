let movieContainer = document.getElementById("container");
var searchBtn = document.getElementById("Search-btn");
var searchInput = document.getElementById("search");
var error = document.getElementById("error");
var loadingAnimation = document.getElementById("loading");

searchBtn.addEventListener("click", searchMovies);
searchInput.addEventListener("keypress", function (event) {
  if (event.keyCode === 13) {
    searchMovies();
  }
});

let debounceTimeout;

function searchMovies() {
  movieContainer.innerHTML = ``;
  loadingAnimation.style.display = "block";

  // Validate search input value
  let searchTerm = searchInput.value.trim();
  if (searchTerm === "") {
    alert("Please enter a search term.");
    loadingAnimation.style.display = "none";
    return;
  }

  // Debounce the API request by 1 second
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        let data = JSON.parse(this.responseText);
        if (data.Response == "True") {
          let movies = data.Search;
          movies.map((item, i) => {
            movieContainer.innerHTML += `
            <div class="movie-card">
              <img src=${item.Poster} />
              <h3>${item.Title}</h3>
              <h5>${item.Year}</h5><br>
              <h5>${item.Type}</h5>
            </div>
          `;
          });
          loadingAnimation.style.display = "none";
        } else {
          error.innerHTML = `<i class="fa-regular fa-face-sad-tear "></i><h1>Sorry,Movie not found!</h1>`;
          loadingAnimation.style.display = "none";
        }
      }
    };
    xhttp.open(
      "GET",
      `https://www.omdbapi.com/?apikey=45f0782a&s=${searchTerm}`,
      true
    );
    xhttp.send();
  }, 1000);
}
