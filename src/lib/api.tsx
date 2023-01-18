import { invoke } from '@tauri-apps/api';


/**
 * getStatus - function that gets the status of a website by its url
 * @param {string} url - The URL of the website to check.
 * @param {number} id - The unique ID of the website.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the website status information.
 */
export async function getStatus(url: string, id: number) {
  try {
    const stringId = "monitor_event_" + id.toString()
    const result = await invoke('get_website_data', { url: url, id: stringId })
    return result
  } catch (err) {
    console.log(err);
  }
}


/**
 * getIcon - function that gets the icon of a website by its url
 * @param {string} url - The URL of the website to check.
 * @param {number} id - The unique ID of the website.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the website icon information.
 */
export async function getIcon(url: string, id: number) {
  try {
    const stringId = "monitor_icon_event_" + id.toString()
    const result = await invoke('get_website_icon', { url: url, id: stringId })
    return result
  } catch (err) {
    console.log(err);
  }
}