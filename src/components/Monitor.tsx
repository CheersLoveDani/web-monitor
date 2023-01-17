import { useEffect, useState } from 'react'
import { getStatus, getIcon } from '../lib/api'
import { useRecoilState } from 'recoil'
import { siteLoadState, websiteDataState } from '../lib/atom'
import { BiLinkExternal } from 'react-icons/bi'
import { AiOutlineArrowUp } from 'react-icons/ai'
import { ImBin } from 'react-icons/im'
import LoadingSpinner from './LoadingSpinner'
import { readFile, saveFileLocal } from '../lib/fileHandling'
import { listen } from '@tauri-apps/api/event'

/**
 * Monitor - a functional component that displays the status of a website
 * @param {MonitorProps} prop - an object containing the website url, name and id
 */
const Monitor = (prop: { website: string, siteName: string, id: number }) => {
  const [siteLoaded, setSiteLoaded] = useRecoilState(siteLoadState)
  const [websiteData, setWebsiteData] = useRecoilState(websiteDataState)

  const [status, setStatus] = useState('Untested')
  const [statusText, setStatusText] = useState('Untested')
  const [iconText, setIconText] = useState('')
  const [loadingStatus, setLoadingStatus] = useState(true)
  const [loadingIcon, setLoadingIcon] = useState(true) //haven't done anything with this but could be used to add loadingSpinner before icon loads
  const [checkingDeletePrompt, setCheckingDeletePrompt] = useState(false)


  // useEffect - calls the checkStatus and checkIcon() function on mount and whenever websiteData changes
  useEffect(() => {
    checkStatus();
    checkIcon();
  }, [websiteData])

  // useEffect - sets up an interval to call the checkStatus() function once every hour
  useEffect(() => {
    const intervalId = setInterval(() => {
      checkStatus();
    }, 3600000); // Interval time in milliseconds (1 hour)

    return () => clearInterval(intervalId);
  }, []);


  /**
   * openSite - opens the website in a new tab and checks if it is loaded
   */
  async function openSite() {
    setSiteLoaded(false);
    const site = window.open(prop.website);
    if (site) {
      site.onload = function () {
      }
    } else {
    }
  }

  /**
   * checkStatus - gets the website status and sets the statusText state
   */
  async function checkStatus() {
    try {
      await getStatus(prop.website, prop.id)
      const eventName = "monitor_event_" + prop.id.toString()
      await listen(eventName, (event: any) => {
        setLoadingStatus(false)
        const status = event.payload.status_payload
        setStatusText(status)
      })
    } catch (err: any) {
      setStatus(err.request.status.toString());
      setStatusText(err.request.statusText)
      setLoadingStatus(false)
    }
  }

  /**
 * checkIcon - gets an icon for a website and sets the iconText state as a base64 encoded image
 */
  async function checkIcon() {
    try {
      await getIcon(prop.website, prop.id)
      const eventName = "monitor_icon_event_" + prop.id.toString()
      await listen(eventName, (event: any) => {
        setLoadingIcon(false)
        const status = event.payload.icon_payload
        setIconText(status)
      })
    } catch (err: any) {
      setIconText(err.request.statusText)
      setLoadingIcon(false)
    }
  }

  /**
   * deleteWebsite - function that deletes a website from the websiteData array and saves the updated array
   *
   */
  function deleteWebsite() {
    const postDeleteWebsiteData = websiteData.filter((website) => {
      if (website.id !== prop.id) {
        return true
      }
    })

    setWebsiteData(postDeleteWebsiteData);
    saveLoad(postDeleteWebsiteData)
  }

  /**
   * saveLoad - function that saves the updated websiteData array and reloads the new data
   * @param {any} postDeleteWebsiteData - an object containing the updated websiteData after deletion 
   */
  async function saveLoad(postDeleteWebsiteData: any) {
    saveFileLocal(JSON.stringify(postDeleteWebsiteData))
    // const newData = JSON.parse(await readFile())
    // setWebsiteData(newData)
  }


  return (
    <div className={'monitor-wrapper status' + statusText}>
      <div className='flex-row'>
        {iconText ?
          <img className='loaded-favicon' src={`data:image/x-icon;base64,${iconText}`} alt="Website Icon" onError={(e) => e.currentTarget.style.display = 'none'} />
          : ''}
        <h1>{prop.siteName}</h1>
        <a className='icon-button background-hover'
          onClick={() => setSiteLoaded(true)} href={prop.website}
          target={'default'}><AiOutlineArrowUp />
        </a>
        <div className='icon-button background-hover' onClick={openSite}><BiLinkExternal /></div>
        <div className='icon-button background-hover icon-danger' onClick={deleteWebsite}>
          <ImBin />
        </div>
      </div>
      <p className='monitor-url'>{prop.website}</p>
      <p>{!loadingStatus && status ? statusText : ''}</p>
      <div className='inline-button-container'>
        {loadingStatus ? <LoadingSpinner /> : ''}
      </div>
    </div>
  );
};

export default Monitor;
