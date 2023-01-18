import { url } from 'inspector';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useRecoilState } from "recoil";
import { addingWebsiteState, websiteDataState } from "../lib/atom";
import { readFile, saveFileLocal } from '../lib/fileHandling';
import { convertWebsiteDataId, save, saveWebsiteData } from '../lib/saveLoad';


/**
 * AddWebsite component is a modal that allows user to add new website to the monitor list
 */
const AddWebsite = () => {
  const [addingWebsite, setAddingWebsite] = useRecoilState(addingWebsiteState)
  const [websiteData, setWebsiteData] = useRecoilState(websiteDataState)

  const [newWebsiteData, setNewWebsiteData] = useState({ name: "", url: "", id: 0 })

  /**
   * stopAddingWebsite sets addingWebsite state to false, closing the modal
   */
  function stopAddingWebsite() {
    setAddingWebsite(false)
  }

  /**
  * handleNameChange sets the name of the new website in the newWebsiteData state
  * @param {object} event - event object of the input change
  */
  function handleNameChange(event: any) {
    setNewWebsiteData({ ...newWebsiteData, name: event.target.value, id: websiteData.length })
  }

  /**
   * handleUrlChange sets the url of the new website in the newWebsiteData state
   * @param {object} event - event object of the input change
   */
  function handleUrlChange(event: any) {
    setNewWebsiteData({ ...newWebsiteData, url: event.target.value, id: websiteData.length })
  }

  /**
 * Converts a given URL to HTTPS format.
 * @returns {string} The converted HTTPS URL.
 */
  function convertUrlToHttps(oldUrl: string): string {
    let url = oldUrl
    if (url.startsWith("https://")) {
      return url
    } else {
      url = "https://" + url
    }
    return url
  }

  /**
   * saveToWebsiteData saves the new website to the websiteData state and saves it to the local file, then closes the modal with stopAddingWebsite()
   */
  function saveToWebsiteData() {
    const newUrl = convertUrlToHttps(newWebsiteData.url)
    setNewWebsiteData({ ...newWebsiteData, id: websiteData.length, url: newUrl })
    const oldWebsiteDataArray = websiteData
    let newData
    if (!newWebsiteData.name) {
      newData = oldWebsiteDataArray.concat([{ ...newWebsiteData, id: websiteData.length, url: newUrl, name: newUrl }])
    } else {
      newData = oldWebsiteDataArray.concat([{ ...newWebsiteData, id: websiteData.length, url: newUrl }])
    }
    const modifiedWebsiteData = convertWebsiteDataId(newData)
    saveWebsiteData(modifiedWebsiteData)
    setWebsiteData(modifiedWebsiteData)
    stopAddingWebsite()
  }



  return (
    <div className="modal-outer-wrapper" onClick={() => stopAddingWebsite()}>
      <div className="modal-inner-wrapper" onClick={(event) => event.stopPropagation()}>
        <div className='flex-row'>
          <h2>Add a website</h2>
          <div className='icon-button background-hover' onClick={() => setAddingWebsite(false)}>

            <AiOutlineClose />
          </div>
        </div>
        <label>Website Name</label>
        <input placeholder="Name of Website" onChange={handleNameChange} value={newWebsiteData.name} />
        <label>Website Url</label>
        <input placeholder="https://www.example.com" onChange={handleUrlChange} value={newWebsiteData.url} />
        <button onClick={saveToWebsiteData}>Add</button>
      </div>
    </div>
  );
};

export default AddWebsite;
