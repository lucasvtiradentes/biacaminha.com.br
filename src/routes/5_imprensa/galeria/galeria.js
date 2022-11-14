const endpoint = "https://api.flickr.com/services/rest/"
const method = "flickr.people.getPublicPhotos"
const apiKey = "4912feac8c866a2c76b84eca4bb55442";
const user_id = "195106633@N07"
const extras = "url_sq,url_t,url_s,url_m,url_o";

const method2 = "flickr.photosets.getPhotos"
const photosetId = "72157645448920573";

const request = endpoint +
  `?method=${method}` +
  `&api_key=${apiKey}` +
  `&user_id=${user_id}` +
  `&extras=${extras}`+
  "&format=json&nojsoncallback=?"

fetch(request)
  .then(response => response.json())
  .then(data => {
    const photos = data.photos.photo
    buildGallery(photos)
  });

function buildGallery(photos, limitation) {

  let imgLim = photos.length

  if (limitation){
    imgLim = limitation
  }
  for (var i = 0; i < imgLim; i++) {
    const imgLink = photos[i].url_m
    const imgId = photos[i].id
    const imgHtml = generateImgHtml(imgLink, imgId)
    const elParent = document.querySelector('.galery-img')

    if (elParent){
      elParent.insertAdjacentHTML('beforeend', imgHtml)
    }
  }
}

function generateImgHtml(link, id){
  return `
  <div class="galery-item">
    <a target="_blank" href='https://www.flickr.com/photos/195106633@N07/${id}/in/dateposted/'>
      <img src="${link}" alt="" srcset="">
    </a>
  </div>
  `
}