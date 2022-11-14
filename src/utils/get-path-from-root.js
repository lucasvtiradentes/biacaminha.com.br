import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const basePath = join(__dirname, '../../');

export default function getPathFromRoot(relPath) {
  const rootPath = join(basePath, relPath);
  return rootPath;
}
