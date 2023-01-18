import { saveFileLocal } from "./fileHandling";

/**
   * saveLoad - function that saves the updated websiteData array and reloads the new data
   * @param {any} data - an object containing the updated websiteData after deletion 
   */
export async function save(data: any): Promise<boolean> {
  try {
    await saveFileLocal(JSON.stringify(data))
    return true
  } catch (err) {
    console.log(err);
    return false
  }
}

export function convertWebsiteDataId(websiteData: any): any {
  const newWebsiteData = websiteData.map((website: any, i: number) => {
    return { ...website, id: i }
  })
  return newWebsiteData
}

export async function saveWebsiteData(websiteData: any) {

  await saveFileLocal(JSON.stringify(websiteData))
}
