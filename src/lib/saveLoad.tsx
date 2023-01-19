import { saveFileLocal } from "./fileHandling";

/**
 * save - function that saves the updated websiteData array
 * @param {any} data - an object containing the updated websiteData
 * @returns {Promise<boolean>} - A promise that resolves to true if the save operation is successful, false otherwise.
 */
export async function save(data: any): Promise<boolean> {
  try {
    await saveFileLocal('data.json', JSON.stringify(data))
    return true
  } catch (err) {
    console.log(err);
    return false
  }
}

/**
 * convertWebsiteDataId - function that assigns an unique ID to each element of the websiteData array
 * @param {any} websiteData - an array of website data
 * @returns {any} - An array of website data with unique IDs assigned to each element
 */
export function convertWebsiteDataId(websiteData: any): any {
  const newWebsiteData = websiteData.map((website: any, i: number) => {
    return { ...website, id: i }
  })
  return newWebsiteData
}

/**
 * saveWebsiteData - function that saves the website data array to a local file
 * @param {any} websiteData - an array of website data
 * @returns {Promise<boolean>} - A promise that resolves to true if the save operation is successful, false otherwise.
 */
export async function saveWebsiteData(websiteData: any) {
  try {
    await saveFileLocal('data.json', JSON.stringify(websiteData))
  } catch (err) {
    console.log(err);
    return false
  }
}

/**
 * saveSettingsData - function that saves the Settings data object to a local file
 * @param {any} settingsData - an object of Settings data
 * @returns {Promise<boolean>} - A promise that resolves to true if the save operation is successful, false otherwise.
 */
export async function saveSettingsData(settingsData: any) {
  try {
    await saveFileLocal('settings.json', JSON.stringify(settingsData))
  } catch (err) {
    console.log(err);
    return false
  }
}
