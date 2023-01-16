import { writeTextFile, BaseDirectory, readTextFile } from '@tauri-apps/api/fs';


/**
 * saveFileLocal - function that writes the passed in file contents to a json file in the AppLocalData directory
 * - On Windows, this directory is typically located in %LOCALAPPDATA%\[AppName]
 * - On Linux, this is typically located in ~/.config/[AppName]
 * - On macOS, this is typically located in ~/Library/Application Support/[AppName]
 * @param {string} fileContents - a string containing the contents to be saved in the json file
 */
export async function saveFileLocal(fileContents: string) {
  await writeTextFile('data.json', fileContents, { dir: BaseDirectory.AppLocalData });
}

/**
 * readFile - function that reads the contents of a json file in the AppLocalData directory and returns it as a string
 * - On Windows, this directory is typically located in %LOCALAPPDATA%\[AppName]
 * - On Linux, this is typically located in ~/.config/[AppName]
 * - On macOS, this is typically located in ~/Library/Application Support/[AppName]
 * @returns {string} the contents of the json file
 */
export async function readFile() {
  try {
    const response = await readTextFile('data.json', { dir: BaseDirectory.AppLocalData });
    return response.toString()
  } catch (err) {
    console.error("nothing to load");
    return "Error: Nothing to load"
  }
}