import '../css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import fetchPictures from './fetch';


const refs = {
input: document.querySelector('input'),
form: document.querySelector('.search-form'),
buttonLoad: document.querySelector('.load-more'),
gallery: document.querySelector('.gallery'),
alert: document.querySelector('.alert')
}


refs.form.addEventListener('submit', onFormSubmit);
refs.buttonLoad.addEventListener('click', onLoadMoreBtn);


let currentPage = 1;
let searchName = '';
refs.buttonLoad.classList.add('ishidden');
const lightbox = new SimpleLightbox('.gallery a', {captionsData: 'alt', captionPosition: 'bottom', captionDelay: 250,});



    
function onFormSubmit(e) {    
e.preventDefault()
refs.buttonLoad.classList.add('ishidden');

searchName = e.currentTarget.elements.searchQuery.value.trim();
if (searchName === 0 ) {
  return;
} else {
clearGalleryList();
currentPage = 1;
fetchRequest (searchName, currentPage); 
}
}



function onLoadMoreBtn(){
  refs.buttonLoad.classList.add('ishidden');
  currentPage += 1;
  searchName = refs.input.value.trim();
  fetchRequest(searchName, currentPage); 
}

async function fetchRequest (searchQuery, currentPage) {
  try {
    const fetchResult = await fetchPictures(searchQuery, currentPage);  
    if (currentPage === 1) {
      Notiflix.Notify.info(`Hooray! We found ${fetchResult.totalHits} images.`);
    }
    filterFetchResult(fetchResult);
} catch (error) {console.log(error)}
}

function filterFetchResult(fetchResult) {
  if (currentPage === Math.ceil(fetchResult.totalHits / 40)) {
      insertMarkup(fetchResult.hits);  
      refs.buttonLoad.classList.add('ishidden');
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      smoothScrollToBottomPage();
      lightbox.refresh();
      return;
  } else if (fetchResult.total === 0) {
      refs.buttonLoad.classList.add('ishidden');
      Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");   
      return;
  } else { 
      insertMarkup(fetchResult.hits);  
      refs.buttonLoad.classList.remove('ishidden');
      smoothScrollToBottomPage();
      lightbox.refresh();
      return;
  }
}

function smoothScrollToBottomPage () {
  const galleryRect = refs.gallery.getBoundingClientRect();
  window.scrollBy({
      top: galleryRect.height,
      behavior: "smooth",
  })
}

function insertMarkup(arrayImages) {
  const result = createList(arrayImages);
 
  refs.gallery.insertAdjacentHTML('beforeend', result);

}

function createList (arrayImages) {
  return arrayImages.reduce((acc, item) => acc + createMarkup(item), "");
}

function  createMarkup (img) {
  return `
  <div class="photo-card">
         <a href="${img.largeImageURL}" class="gallery_link">
          <img class="gallery__image" src="${img.webformatURL}" alt="${img.tags}" width="370px" loading="lazy" />
          </a>
        <div class="info">
              <p class="info-item">
              <b>Likes<br>${img.likes}</b>
              </p>
              <p class="info-item">
              <b>Views<br>${img.views}</b>
              </p>
              <p class="info-item">
              <b>Comments<br>${img.comments}</b>
              </p>
              <p class="info-item">
              <b>Downloads<br>${img.downloads}</b>
              </p>
        </div>
    </div>
`}




  function clearGalleryList () {
    refs.gallery.innerHTML = "";
};