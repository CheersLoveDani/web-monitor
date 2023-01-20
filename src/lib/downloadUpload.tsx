import { open, save } from '@tauri-apps/api/dialog';
import { writeTextFile, readTextFile } from '@tauri-apps/api/fs';
import { convertWebsiteDataId, saveWebsiteData } from './saveLoad';


/**
 * Asynchronously downloads data, saves it to the location specified by the user 
 * and writes the contents of the file.
 * @param {string} fileContents - The contents of the file to be saved.
 * @param {string} fileName - The name of the file to be saved.
 */
export async function download(fileContents: string, fileName: string) {
  try {
    const filePath = await save({
      filters: [{ name: 'All Files', extensions: ['json'] }],
      title: 'Where do you want to save the data?',
      defaultPath: fileName
    });
    if (!filePath) {
      return
    }
    writeTextFile(filePath, fileContents)
  } catch (e) {
    console.error(e)
  }
}

/**
 * Asynchronously uploads website data, converts it, saves it, 
 * and returns the modified data to be set to a recoil state.
 * @returns {Promise<any>} - The modified website data.
 */
export async function uploadWebsiteData(): Promise<any> {
  try {
    const filePath = await open({
      filters: [{ name: 'All Files', extensions: ['json'] }],
      title: 'Which data would you like to load?',
    });
    if (!filePath) {
      return
    }
    const newData = JSON.parse(await readTextFile(filePath.toString()));
    console.log(newData);
    const modifiedWebsiteData = convertWebsiteDataId(newData)
    await saveWebsiteData(modifiedWebsiteData)
    return modifiedWebsiteData

  } catch (e) {
    console.error(e)
  }
}