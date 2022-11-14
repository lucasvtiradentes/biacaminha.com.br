import {
  ROOT_PATH,
  SERVER_BASE
} from '../../configs/configs.js';

import fetch from 'node-fetch';

export default async function currentController(request, response) {

  const res = await fetch(`${SERVER_BASE}/getinfo?mode=mandata`);
  const mandata = await res.json();

  response.render(ROOT_PATH('/src/routes/4_atuacao/atuacao.ejs'), {
    mandata: mandata
  });

}
