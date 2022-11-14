import {
  ROOT_PATH,
  SERVER_BASE
} from '../../configs/configs.js';

import fetch from 'node-fetch';

export default async function currentController(request, response) {

  const resNumbers = await fetch(`${SERVER_BASE}/getinfo?mode=numbers`);
  const numbers = await resNumbers.json();

  const resImages = await fetch(`${SERVER_BASE}/getinfo?mode=images`);
  const images = await resImages.json();

  const resLastNews = await fetch(`${SERVER_BASE}/getinfo?mode=lastnews`);
  const lastnews = await resLastNews.json();

  const res = await fetch(`${SERVER_BASE}/getinfo?mode=articles`);
  const articles = (await res.json()).slice(-3).reverse();

  response.render(ROOT_PATH('/src/routes/2_home/home.ejs'), {
    numbers,
    images,
    lastnews,
    articles,
    homeimages: images.imagem_inicial
  });
}
