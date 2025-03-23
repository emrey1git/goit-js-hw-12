//axios(htttp istekleri)
import axios from 'axios';
 
// Örnek: Pixabay'dan veri çekme
// const API_KEY = 'senin_api_key';
// const BASE_URL = 'https://pixabay.com/api/';

// async function fetchImages(query) {
//   try {
//     const response = await axios.get(BASE_URL, {
//       params: {
//         key: API_KEY,
//         q: query,
//         image_type: 'photo',
//         orientation: 'horizontal',
//         safesearch: true,
//         per_page: 20,
//       },
//     });
//     return response.data.hits;
//   } catch (error) {
//     console.error('Hata oluştu:', error);
//     iziToast.error({
//       title: 'Hata!',
//       message: 'Veriler alınırken bir sorun oluştu.',
//     });
//   }
// }

//simplelightbox(galeri efektleri için)

import SimpleLightbox from 'simplelightbox/dist/simple-lightbox.esm';
import 'simplelightbox/dist/simple-lightbox.min.css';

// const lightbox = new SimpleLightbox('.gallery a', {
//   captionsData: 'alt',
//   captionDelay: 250,
// });

//izitoast(bildirimler için)
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// iziToast.success({
//   title: 'Başarılı!',
//   message: 'İşlem başarıyla tamamlandı.',
// });

// iziToast.error({
//   title: 'Hata!',
//   message: 'Bir sorun oluştu.',
// });

//Tanımlamalar
const form = document.querySelector('.form');
const galleryList = document.querySelector('.gallery')


//photo html
const galeryContent = photoInfo => {
    const item = document.createElement('li')
    item.classList.add('gallery-item');
    item.dataset.source = photoInfo.largeImageURL;

    const itemLink = document.createElement('a');
    itemLink.classList.add('item-link');
    itemLink.href = photoInfo.largeImageURL;
    itemLink.style.color = 'black';

    const img = document.createElement('img');
    img.src = photoInfo.webformatURL;
    img.alt = photoInfo.tags;
    img.width = 360;
    img.height = 200;

    //under the photo (likes-views-comments-downloads)
    const photoInfoContent = document.createElement('div');
    photoInfoContent.classList.add('photo-info-content');


    //likes
    const likesDiv = document.createElement('div');
    likesDiv.classList.add('photo-interaction');

    const likesTitle = document.createElement('h5');
    likesTitle.classList.add('interaction-title')
    likesTitle.textContent = 'Likes'
    likesDiv.appendChild(likesTitle);

    const likesContent = document.createElement('p');
    likesContent.classList.add('interaction-info')
    likesContent.textContent = photoInfo.likes;
    likesDiv.appendChild(likesContent);

    //views
    const viewsDiv = document.createElement('div');
    viewsDiv.classList.add('photo-interaction');

    const viewsTitle = document.createElement('h5');
    viewsTitle.classList.add('interaction-title');
    viewsTitle.textContent = 'Views';
    viewsDiv.appendChild(viewsTitle);

    const viewsContent = document.createElement('p');
    viewsContent.classList.add('interaction-info');
    viewsContent.textContent = photoInfo.views;
    viewsDiv.appendChild(viewsContent);

    //comments 
    const commentsDiv = document.createElement('div');
    commentsDiv.classList.add('photo-interaction');

    const commentsTitle = document.createElement('h5');
    commentsTitle.classList.add('interaction-title');
    commentsTitle.textContent = 'Comments';
    commentsDiv.appendChild(commentsTitle);

    const commentsContent = document.createElement('p');
    commentsContent.classList.add('interaction-info');
    commentsContent.textContent = photoInfo.comments;
    commentsDiv.appendChild(commentsContent);

    //downloads
    const downloadsDiv = document.createElement('div');
    downloadsDiv.classList.add('photo-interaction');

    const downloadsTitle = document.createElement('h5');
    downloadsTitle.classList.add('interaction-title');
    downloadsTitle.textContent = 'Downloads';
    downloadsDiv.appendChild(downloadsTitle);

    const downloadsContent = document.createElement('p');
    downloadsContent.classList.add('interaction-info');
    downloadsContent.textContent = photoInfo.downloads;
    downloadsDiv.appendChild(downloadsContent);

    //üste doğru divlerin eklenmesi
    photoInfoContent.appendChild(likesDiv);
    photoInfoContent.appendChild(viewsDiv);
    photoInfoContent.appendChild(commentsDiv);
    photoInfoContent.appendChild(downloadsDiv);
    itemLink.appendChild(img);
    item.appendChild(photoInfoContent);
    item.appendChild(itemLink);
    galleryList.appendChild(item);
}

    //kütüphanelerle etkileşim

    let galleryBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
    });
    
form.addEventListener('submit', e => {
    e.preventDefault();
    //   console.log('Form gönderildi');
    const inputValue = e.target.elements.search.value;
    if (inputValue === "") {
        iziToast.warning({
            position: 'topRight',
            message: 'Please enter a search query!',
        })
        return false;
    }
    else {
        const item = document.createElement('li');
        item.classList.add('gallery-item');

        const itemLoading = document.createElement('span');
        itemLoading.classList.add('loading');

        item.appendChild(itemLoading);
        item.style.textAlign = 'center';
        item.style.border = 'none';
        galleryList.appendChild(item);
            
        axios.get('https://pixabay.com/api/', {
            params: {
                key: '49491567-9a49db2ea0fcdbe14ac3185ce',
                q: inputValue,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
            }
        })
            .then(response => {
                const photos = response.data.hits;
                console.log(photos);
                galleryList.innerHTML = '';
                if (photos.length === 0) {
                    iziToast.error({
                        position: 'topRight',
                        color: 'red',
                        message: 'Sorry, there are no images matching your search query. Please, try again!',
                    })
                } else {
                    photos.forEach(photo => {
                        galeryContent(photo);
                    });
                   if (galleryBox) {
                        galleryBox.destroy();
                    };


                    galleryBox = new SimpleLightbox('.gallery a', {
                        captionsData: 'alt',
                        captionDelay: 250,
                    });
            
                }
            })
            .catch(error => {
                iziToast.error({
                    position: 'topRight',
                    color: 'red',
                    message: error.message,
                });
                galleryList.innerHTML = '';
                console.error('Pixabay error: ', error);
            });
        e.target.reset();
            
    };
});




