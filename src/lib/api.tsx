import { invoke } from '@tauri-apps/api';


/**
 * getStatus - function that gets the status of a website by its url
 * 
 * @param {string} url - the url of the website to check
 * @param {number} id - the id of the website
 * @returns {Promise<Object>} - returns a promise that resolves to an object containing the website status information
 */
export async function getStatus(url: string, id: number) {
  try {
    const stringId = "monitor_event_" + id.toString()
    const result = await invoke('get_website_data', { url: url, id: stringId })
    console.log(result);
    return result
  } catch (err) {
    console.log(err);
  }
}