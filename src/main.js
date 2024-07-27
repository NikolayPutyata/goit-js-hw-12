import createHttpRequest from './js/pixabay-api';
import addImagesToHtml from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const loader = document.querySelector('.loader');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more-button');

const KEY = '45056360-0d73312e4ecad0bc63c18ca30';
let currentPage = 1;
let searchQuery = '';

form.addEventListener('submit', searchImagesFu);
loadMoreButton.addEventListener('click', loadMoreImages);

async function searchImagesFu(event) {
  event.preventDefault();

  searchQuery = form.elements[0].value.trim();
  currentPage = 1;
  gallery.innerHTML = '';

  if (searchQuery === '' || searchQuery.length < 2) {
    iziToast.error({
      title: '',
      message: 'The input field is empty or has less than two characters!',
    });
    return;
  }

  loader.style.display = 'block';

  const options = {
    params: {
      key: KEY,
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      page: currentPage,
      per_page: 15,
    },
  };

  try {
    const data = await createHttpRequest(options);
    loader.style.display = 'none';

    if (data.hits.length === 0) {
      iziToast.error({
        title: '',
        message: 'No pictures found! Try again!',
      });
      loadMoreButton.style.display = 'none';
    } else {
      addImagesToHtml(data.hits);
      loadMoreButton.style.display = 'block';
    }
  } catch (error) {
    loader.style.display = 'none';
    iziToast.error({
      title: '',
      message: `Error fetching images: ${error.message || error}`,
    });
  } finally {
    form.reset();
  }
}

async function loadMoreImages() {
  loader.style.display = 'block';
  currentPage += 1;

  const options = {
    params: {
      key: KEY,
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      page: currentPage,
      per_page: 15,
    },
  };

  try {
    const data = await createHttpRequest(options);
    loader.style.display = 'none';

    if (data.hits.length === 0) {
      loadMoreButton.style.display = 'none';
      iziToast.info({
        title: '',
        message: 'No more pictures found!',
      });
    } else {
      addImagesToHtml(data.hits);
      const galleryItem = document.querySelector('.gallery li');
      const galleryItemParams = galleryItem.getBoundingClientRect();
      window.scrollBy({
        top: galleryItemParams.height * 2,
        behavior: 'smooth',
      });
    }
  } catch (error) {
    loader.style.display = 'none';
    iziToast.error({
      title: '',
      message: `Error fetching images: ${error.message || error}`,
    });
  }
}
