import {
  ROOT_PATH,
  SERVER_BASE
} from '../../../configs/configs.js';

import fetch from 'node-fetch';

export default async function currentController(request, response) {

  const article_id = request.params.art_id;
  const res = await fetch(`${SERVER_BASE}/getinfo?mode=article&id=${article_id}`);
  const article = await res.json();
  const title = article[0].article_title;
  const content = article[0].article_content;

  response.render(ROOT_PATH('/src/routes/5_imprensa/artigo/artigo.ejs'), {
    title,
    content
  });
}
