import { useEffect } from "react"
import { useRecoilState } from "recoil"
import AddWebsite from "../../components/AddWebsite"
import Monitor from "../../components/Monitor"
import { addingWebsiteState, siteLoadState, viewModeState, websiteDataState } from "../../lib/atom"
import { readFile } from "../../lib/fileHandling"

function MainView() {

  // UseEffect to load the website data when the component is rendered
  useEffect(() => {
    load()
  }, [])

  // Recoil states for global states, see lib/atoms.tsx
  const [siteLoaded, setSiteLoaded] = useRecoilState(siteLoadState)
  const [websiteData, setWebsiteData] = useRecoilState(websiteDataState)
  const [addingWebsite, setAddingWebsite] = useRecoilState(addingWebsiteState)
  const [viewMode, setViewMode] = useRecoilState(viewModeState);


  /**
   * Load the website data from the local storage
   */
  async function load() {
    const newData = JSON.parse(await readFile())
    setWebsiteData(newData)
  }

  return (

    <div className={`main-content ${viewMode ? 'grid-mode' : 'row-mode'}`}>
      <div className={`iframe-wrapper ${siteLoaded ? 'active' : 'not-active'}`}>
        <iframe name="default" className={siteLoaded ? 'active' : 'not-active'} />
        <button onClick={() => setSiteLoaded(false)}>Close</button>
      </div>
      <div className="main-grid">
        {websiteData[0] ?
          websiteData.map((website) => (
            <div className="main-grid-child" key={website.id}>
              <Monitor url={website.url} name={website.name} id={website.id} />
            </div>
          )) : ''
        }
      </div>
      {addingWebsite ? <AddWebsite /> : ''}
    </div>
  )
}

export default MainView