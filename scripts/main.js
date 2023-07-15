/*
 DOM READY
***************************/
(function () {

  const containers = document.querySelectorAll('.jpx-listAllMovies')

  if (containers && containers.length > 0) {
    for (let i = 0; i < containers.length; i++) {
      fetchJsonData(containers[i])
    }
  }

})();

/*
  FETCH JSON DATA
***************************/
function fetchJsonData(container) {

  const id = container.getAttribute('id');
  const category = container.getAttribute('data-movie-category');
  const moviePerSlide = container.getAttribute('data-movie-per-slide');

  // console.log('id:', id)
  // console.log(`json/movies/${category}.json`)

  fetch(`json/movies/${category}.json`)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then(function (data) {

      // Use the data from the JSON file
      //console.log(data);
      
      LayoutSlider(id, moviePerSlide, data);

    })
    .catch(function (error) {
      console.log("Error:", error.message);
    });
}

/*
  SLIDERS MAIN LAYOUT
***************************/
function LayoutSlider(id, moviePerSlide, data) {
  const movieItems = data.movieList;
  let movieList = "";
  let itemSlideCounter = 0;

  if(movieItems && movieItems.length > 0){
    for (let i = 0; i < movieItems.length; i++) {
      movieList +=
        `<div class="img-wrap" style="width:calc(100%/${moviePerSlide})">
        <a href="${movieItems[i].url}" class="show">
          <div class="poster">
            <img class="poster img-fluid" src="${movieItems[i].imageDir}" alt="${movieItems[i].title}" >
          </div>
          <div class="content">
              <div class="title">${movieItems[i].title}</div>
          </div>
        </a>
      </div>`;

      itemSlideCounter++;

      if ((itemSlideCounter == moviePerSlide) || (i == movieItems.length - 1)) {
        appendSliderItem(id, `<div class="img-box">${movieList}</div>`)
        itemSlideCounter = 0;
        movieList = "";
      }

    }
  }
}

/*
  APPEND SLIDER ITEM
***************************/
function appendSliderItem(id, appendHtml) {
  const slider = document.getElementById(id);
  const carouselInner = slider.querySelector('.carousel-inner');
  const newItem = document.createElement('div');

  newItem.className = 'carousel-item';
  if (carouselInner.childElementCount === 0) {
    newItem.classList.add('active');
  }
  //console.log('appendHtml', appendHtml)

  newItem.innerHTML = appendHtml
  carouselInner.appendChild(newItem);
}
