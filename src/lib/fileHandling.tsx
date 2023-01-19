import { writeTextFile, BaseDirectory, readTextFile } from '@tauri-apps/api/fs';


/**
 * saveFileLocal - function that writes the passed in file contents to a json file in the AppLocalData directory
 * 
 * @param {string} fileName - the name of the file to be saved
 * @param {string} fileContents - a string containing the contents to be saved in the file
 * @param {string} directory - the directory in which to save the file to
 * 
 * - On Windows, the file will be saved in %LOCALAPPDATA%\[AppName]
 * - On Linux, the file will be saved in ~/.config/[AppName]
 * - On macOS, the file will be saved in ~/Library/Application Support/[AppName]
 */
export async function saveFileLocal(fileName: string, fileContents: string, directory: BaseDirectory = BaseDirectory.AppLocalData) {
  await writeTextFile(fileName, fileContents, { dir: directory });
}

/**
 * readFile - function that reads the contents of a json file in the AppLocalData directory and returns it as a string
 * - On Windows, this directory is typically located in %LOCALAPPDATA%\[AppName]
 * - On Linux, this is typically located in ~/.config/[AppName]
 * - On macOS, this is typically located in ~/Library/Application Support/[AppName]
 * @returns {string} the contents of the json file
 */
export async function readFile(fileName: string, directory: BaseDirectory = BaseDirectory.AppLocalData) {
  try {
    const response = await readTextFile(fileName, { dir: directory });
    return response.toString()
  } catch (err) {
    console.error("nothing to load");
    return "Error: Nothing to load"
  }
}