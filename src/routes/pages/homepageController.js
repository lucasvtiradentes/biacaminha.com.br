import {
  ROOT_PATH
} from '../../../configs/configs.js'


export default function currentController(request, response) {
  response.render(ROOT_PATH('/src/views/pages/index'));
}