import { useEffect, useRef, useState } from 'react'
import { getStatus, getIcon } from '../lib/api'
import { useRecoilState } from 'recoil'
import { settingsDataState, siteLoadState, websiteDataState } from '../lib/atom'
import { BiLinkExternal } from 'react-icons/bi'
import { AiOutlineArrowUp } from 'react-icons/ai'
import { ImBin } from 'react-icons/im'
import LoadingSpinner from './LoadingSpinner'
import { listen } from '@tauri-apps/api/event'
import DeletePrompt from './DeletePrompt'
import { saveWebsiteData } from '../lib/saveLoad'

/**
 * Monitor - a functional component that displays the status of a website
 * @param {MonitorProps} prop - an object containing the website url, name and id
 */
const Monitor = (prop: { url: string, name: string, id: number }) => {
  const [siteLoaded, setSiteLoaded] = useRecoilState(siteLoadState)
  const [websiteData, setWebsiteData] = useRecoilState(websiteDataState)
  const [settingsData, setSettingsData] = useRecoilState(settingsDataState)

  const [status, setStatus] = useState('Untested')
  const [statusText, setStatusText] = useState('Untested')
  const [iconText, setIconText] = useState('')
  const [loadingStatus, setLoadingStatus] = useState(true)
  const [loadingIcon, setLoadingIcon] = useState(true) //haven't done anything with this but could be used to add loadingSpinner before icon loads
  const [checkingDeletePrompt, setCheckingDeletePrompt] = useState(false)
  const [isEditingName, setIsEditingName] = useState(false)
  const [isEditingUrl, setIsEditingUrl] = useState(false)

  const nameRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);


  // useEffect - calls the checkStatus and checkIcon() function on mount and whenever websiteData changes
  useEffect(() => {
    checkStatus();
    checkIcon();
  }, [websiteData])

  // useEffect - sets up an interval to call the checkStatus() function to call however often is set in settings
  useEffect(() => {
    setCheckInterval()
  }, []);

  function setCheckInterval() {
    const intervalId = setInterval(() => {
      checkStatus();
    }, 60000 * settingsData.refreshIntervalMinutes); // Interval time in milliseconds (1 hour)
    return () => clearInterval(intervalId);
  }

  /**
 * Opens the website in a new tab and sets the "siteLoaded" state to false.
 */
  async function openSite() {
    setSiteLoaded(false);
    const site = window.open(prop.url);
    if (site) {
      site.onload = function () {
      }
    } else {
    }
  }

  /**
   * Gets the website status from the backend and sets the "statusText" state.
   */
  async function checkStatus() {
    try {
      await getStatus(prop.url, prop.id)
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
 * Gets an icon for a website and sets the "iconText" state as a base64 encoded image.
 */
  async function checkIcon() {
    try {
      await getIcon(prop.url, prop.id)
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
 * Toggles the state of the "checkingDeletePrompt" variable,
 * which determines whether the delete prompt is shown or hidden.
 */
  function checkDelete() {
    setCheckingDeletePrompt(true)
  }

  /**
 * Handles the "Enter" key press event on the name input field.
 * If the "Enter" key is pressed, the "handleSavingEdit" function is called.
 * @param {Object} event - The key press event object.
 */
  function handleKeyPressName(event: any) {
    if (event.key === "Enter") {
      handleSavingEdit()
    }
  }

  /**
 * Handles the "Enter" key press event on the URL input field.
 * If the "Enter" key is pressed, the "handleSavingEdit" function is called.
 * @param {Object} event - The key press event object.
 */
  function handleKeyPressUrl(event: any) {
    if (event.key === "Enter") {
      handleSavingEdit()
    }
  }

  /**
 * Saves the website data to the state and sets the "isEditingName" and "isEditingUrl" state variables to false.
 */
  function handleSavingEdit() {
    saveWebsiteData(websiteData)
    setIsEditingName(false)
    setIsEditingUrl(false)
  }

  /**
 * Handles the change event on the name input field.
 * Updates the website data in the state with the new name value.
 * @param {Object} event - The change event object.
 */
  function handleNameChange(event: any) {
    const newWebsiteData = websiteData.map((website) => {
      if (website.id !== prop.id) {
        return website
      }
      return { ...website, name: event.target.value }
    })
    setWebsiteData(newWebsiteData)
  }

  /**
 * Handles the change event on the URL input field.
 * Updates the website data in the state with the new URL value.
 * @param {Object} event - The change event object.
 */
  function handleUrlChange(event: any) {
    const newWebsiteData = websiteData.map((website) => {
      if (website.id !== prop.id) {
        return website
      }
      return { ...website, url: event.target.value }
    })
    setWebsiteData(newWebsiteData)
  }

  // Sets the focus state to each input whent usEffect sees they are being edited.
  useEffect(() => {
    if (isEditingName && nameRef.current) {
      nameRef.current.focus()
    } else if (isEditingUrl && urlRef.current) {
      urlRef.current.focus()
    }
  }, [isEditingName, isEditingUrl])



  return (
    <div className={'monitor-wrapper status' + statusText} onClick={() => {
      if (isEditingName || isEditingUrl) { handleSavingEdit() }
    }} >
      <div className='flex-row'>
        {iconText ?
          <img className='loaded-favicon' src={`data:image/x-icon;base64,${iconText}`} alt="Website Icon" onError={(e) => e.currentTarget.style.display = 'none'} />
          : ''}

        {
          isEditingName ?
            <h1>
              <input
                placeholder={prop.name}
                className='monitor-url editing-input'
                onKeyDown={(event) => { handleKeyPressName(event); }}
                onChange={(event) => {
                  handleNameChange(event)
                }}
                onClick={(event) => event.stopPropagation()}
                value={prop.name}
                ref={nameRef}
              />
            </h1>
            :
            <h1
              onClick={() => {
                setIsEditingName(true);
                setIsEditingUrl(false);
              }}>{prop.name}
            </h1>
        }

        <a className='icon-button background-hover'
          onClick={() => setSiteLoaded(true)} href={prop.url}
          target={'default'}><AiOutlineArrowUp />
        </a>
        <div className='icon-button background-hover' onClick={openSite}><BiLinkExternal /></div>
        <div className='icon-button background-hover icon-danger' onClick={checkDelete}>
          <ImBin />
        </div>
      </div>

      {
        isEditingUrl ?
          <p className='monitor-url'>
            <input
              placeholder={prop.url}
              className="editing-input"
              onKeyDown={(event) => { handleKeyPressUrl(event) }}
              onChange={(event) => {
                handleUrlChange(event)
              }}
              onClick={(event) => event.stopPropagation()}
              value={prop.url}
              ref={urlRef}
            />
          </p>
          :
          <div className='monitor-url'>
            <p
              onClick={() => {
                setIsEditingUrl(true)
                setIsEditingName(false)
              }}  >{prop.url}
            </p>
          </div>
      }

      <p>{!loadingStatus && status ? statusText : ''}</p>
      <div className='inline-button-container'>
        {loadingStatus ? <LoadingSpinner /> : ''}
      </div>
      {checkingDeletePrompt ? <DeletePrompt name={prop.name} id={prop.id} setCheckingDeletePrompt={setCheckingDeletePrompt} /> : ''}
    </div>

  );
};

export default Monitor;
