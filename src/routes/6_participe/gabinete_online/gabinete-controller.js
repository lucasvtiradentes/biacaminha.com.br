import {
  ROOT_PATH,
  SERVER_BASE
} from '../../../configs/configs.js';

import fetch from 'node-fetch';

export default async function currentController(request, response) {

  const resForms = await fetch(`${SERVER_BASE}/getinfo?mode=forms`);
  const forms = await resForms.json();

  response.render(ROOT_PATH('/src/routes/6_participe/gabinete_online/gabinete.ejs'), {
    forms: forms
  });
}
