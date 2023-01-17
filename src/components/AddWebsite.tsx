import { url } from 'inspector';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useRecoilState } from "recoil";
import { addingWebsiteState, websiteDataState } from "../lib/atom";
import { readFile, saveFileLocal } from '../lib/fileHandling';


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

  function convertUrlToHttps(): string {
    let url = newWebsiteData.url
    console.log(url);

    // if (url.startsWith("https://www.")) {
    //   console.log('1');
    //   return url
    // }
    if (url.startsWith("https://")) {
      console.log('1');
      return url
    } else {
      url = "https://" + url
    }


    // if (url.startsWith("www.")) {
    //   console.log('2');
    //   url = "https://" + url
    // }
    // else {
    //   console.log('3');
    //   url = "https://www." + url
    // }
    console.log(url);
    return url

  }

  console.log(newWebsiteData);

  /**
   * saveToWebsiteData saves the new website to the websiteData state and saves it to the local file, then closes the modal with stopAddingWebsite()
   */
  function saveToWebsiteData() {
    const newUrl = convertUrlToHttps()
    setNewWebsiteData({ ...newWebsiteData, id: websiteData.length, url: newUrl })
    const oldWebsiteDataArray = websiteData
    let newData
    if (!newWebsiteData.name) {
      newData = oldWebsiteDataArray.concat([{ ...newWebsiteData, id: websiteData.length, url: newUrl, name: newUrl }])
    } else {
      newData = oldWebsiteDataArray.concat([{ ...newWebsiteData, id: websiteData.length, url: newUrl }])
    }
    console.log(newData);
    setWebsiteData(newData)
    saveLoad(newData)
    stopAddingWebsite()
  }

  /**
   * Function that saves the data to the local file system, and loads the data back into the state.
   * @param {any} dataToSave - The website data to save to local storage.
   */
  async function saveLoad(dataToSave: any) {
    saveFileLocal(JSON.stringify(dataToSave))
    // const newData = JSON.parse(await readFile())
    // setWebsiteData(newData)
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
