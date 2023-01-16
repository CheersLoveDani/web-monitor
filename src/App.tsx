import { useState, useEffect } from "react"
import "./App.scss"
import Monitor from "./components/Monitor"
import { useRecoilState } from 'recoil'
import {
  addingWebsiteState,
  siteLoadState,
  websiteDataState
} from './lib/atom'
import { readFile, saveFileLocal } from "./lib/fileHandling"
import AddWebsite from "./components/AddWebsite"
import { GiHamburgerMenu } from 'react-icons/gi'
import { BsFillGrid3X3GapFill } from 'react-icons/bs'
import { MdAddCircleOutline, MdOutlineRefresh } from 'react-icons/md'
import logo from './assets/128x128-white.png'


function App() {
  // Recoil states for global states, see atoms.tsx
  const [siteLoaded, setSiteLoaded] = useRecoilState(siteLoadState)
  const [websiteData, setWebsiteData] = useRecoilState(websiteDataState)
  const [addingWebsite, setAddingWebsite] = useRecoilState(addingWebsiteState)

  const [viewMode, setViewMode] = useState(0);

  /**
    * Refresh the current page
    */
  function refreshPage() {
    window.location.reload();
  }


  /**
   * Load the website data from the local storage
   */
  async function load() {
    const newData = JSON.parse(await readFile())
    console.log(newData);

    setWebsiteData(newData)
  }

  /**
   * Change the view mode between grid and row
   */
  function changeViewState() {
    if (viewMode == 0) {
      setViewMode(1)
    } else {
      setViewMode(0)
    }
  }

  // UseEffect to load the website data when the component is rendered
  useEffect(() => {
    load()
  }, [])

  return (
    <div className="container">
      <div className="top-row">
        <div className="main-logo-wrapper">

          <img src={logo} className="main-logo" />
        </div>
        <div className='icon-button background-hover' onClick={changeViewState}>

          {viewMode ? <BsFillGrid3X3GapFill /> : <GiHamburgerMenu />}
        </div>
        <div className="icon-button background-hover" onClick={() => {
          refreshPage();
        }}><MdOutlineRefresh /></div>



        {/* <button onClick={() => save()}>Save</button>
        <button onClick={() => load()}>Load</button> */}
        <div className="icon-button background-hover" onClick={() => setAddingWebsite(true)}><MdAddCircleOutline /></div>
      </div>
      <div className={"main-content " + (viewMode ? 'grid-mode' : 'row-mode')}>

        <div className={"iframe-wrapper " + (siteLoaded ? 'active' : 'not-active')}>

          <iframe name='default' className={siteLoaded ? 'active' : 'not-active'} />
          <button onClick={() => setSiteLoaded(false)}>{'Close'}</button>
        </div>
        <div className="main-grid">

          {
            websiteData[0] ?
              websiteData.map((website) => {
                return (
                  <div className="main-grid-child" key={website.id}>
                    <Monitor website={website.url} siteName={website.name} id={website.id} />
                  </div>
                )
              }) : ''
          }


        </div>
        {addingWebsite ? <AddWebsite /> : ''}
      </div>
    </div >
  );
}

export default App;
