import {
  ROOT_PATH,
  SERVER_BASE
} from '../../../configs/configs.js';

import fetch from 'node-fetch';

export default async function currentController(request, response) {

  const res = await fetch(`${SERVER_BASE}/getinfo?mode=news`);
  const news = await res.json();

  response.render(ROOT_PATH('/src/routes/5_imprensa/na_midia/na_midia.ejs'), {
    news: news
  });
}
