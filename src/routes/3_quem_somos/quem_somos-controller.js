import {
  ROOT_PATH,
  SERVER_BASE
} from '../../configs/configs.js';

import fetch from 'node-fetch';

export default async function currentController(request, response) {

  const resImages = await fetch(`${SERVER_BASE}/getinfo?mode=images`);
  const images = await resImages.json();

  response.render(ROOT_PATH('/src/routes/3_quem_somos/quem_somos.ejs'), {
    images: images,
  });

}
