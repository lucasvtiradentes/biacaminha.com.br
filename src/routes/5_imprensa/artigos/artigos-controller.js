import {
  ROOT_PATH,
  SERVER_BASE
} from '../../../configs/configs.js';

import fetch from 'node-fetch';

export default async function currentController(request, response) {

  const res = await fetch(`${SERVER_BASE}/getinfo?mode=articles`);
  const articles = await res.json();

  response.render(ROOT_PATH('/src/routes/5_imprensa/artigos/artigos.ejs'), {
    articles: articles,
    server: SERVER_BASE
  });
}
