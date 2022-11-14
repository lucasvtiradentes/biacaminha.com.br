import ROOT_PATH from './get-path-from-root.js';

export default async function importModule(relativePath){

  const rootPath = `file://${ROOT_PATH(relativePath)}`
  const importedFile = await import(rootPath)
  return importedFile.default

}