import {
  ROOT_PATH,
  SERVER_BASE
} from '../../configs/configs.js';

import fetch from 'node-fetch';

export default async function currentController(request, response) {

  const reject = () => {
    response.setHeader('www-authenticate', 'Basic');
    response.sendStatus(401);
  };

  const authorization = request.headers.authorization;

  if(!authorization) {
    return reject();
  }

  const [username, password] = Buffer.from(authorization.replace('Basic ', ''), 'base64').toString().split(':');

  if(! (username === 'biacaminha' && password === 'BC2022ADMIN')) {
    return reject();
  }

  // allowed users
  const resArticles = await fetch(`${SERVER_BASE}/getinfo?mode=articles`);
  const articles = await resArticles.json();

  const resNews = await fetch(`${SERVER_BASE}/getinfo?mode=news`);
  const news = await resNews.json();

  const resImages = await fetch(`${SERVER_BASE}/getinfo?mode=images`);
  const images = await resImages.json();
  var newImages = images;

  const convertImages = (elJsonImages) => {
    let stringImages = '';
    for (let x = 0; x < elJsonImages.length; x++) {
      const img = elJsonImages[x];
      if (x === 0){
        stringImages = img;
      } else {
        stringImages += '\n' + img;
      }
    }

    return stringImages;
  };

  newImages.imagem_inicial = convertImages(newImages.imagem_inicial);

  const resMandata = await fetch(`${SERVER_BASE}/getinfo?mode=mandata`);
  const mandata = await resMandata.json();

  const resNumbers = await fetch(`${SERVER_BASE}/getinfo?mode=numbers`);
  const numbers = await resNumbers.json();

  const resForms = await fetch(`${SERVER_BASE}/getinfo?mode=forms`);
  const forms = await resForms.json();

  response.render(ROOT_PATH('/src/routes/1_admin/admin.ejs'), {
    forms: forms,
    numbers: numbers,
    news: news,
    mandata: mandata,
    images:  newImages,
    article: articles
  });
}
