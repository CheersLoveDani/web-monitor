import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { settingsDataState, websiteDataState } from "../../lib/atom";
import { download, uploadWebsiteData } from "../../lib/downloadUpload";
import { saveSettingsData } from "../../lib/saveLoad";
import { useState } from "react";
import { TiTick } from "react-icons/ti"

const Settings = () => {
  const [websiteData, setWebsiteData] = useRecoilState(websiteDataState)
  const [settingsData, setSettingsData] = useRecoilState(settingsDataState)

  const [saved, setSaved] = useState(false)

  const navigate = useNavigate();


  /**
 * Asynchronously uploads website data and updates the local state
 * then navigates to the homepage.
 */
  async function upload() {
    const newData = await uploadWebsiteData()
    setWebsiteData(newData)
    navigate("/");
  }

  /**
 * Handles the change event of the refresh interval input
 * by updating the local state, saving the data and
 * providing feedback that the data was saved.
 * @param {Object} event - The change event of the input element.
 */
  function handleRefreshIntervalChange(event: any) {
    setSaved(false)
    let value = Math.round(event.target.value)
    if (value > 120) {
      value = 120
    }
    if (value < 1) {
      value = 1
    }
    setSettingsData({ ...settingsData, refreshIntervalMinutes: value })
    saveSettingsData({ ...settingsData, refreshIntervalMinutes: value });
    setSaved(true)
  }


  return (
    <div className='main-content'>
      <div className="text-padding flex-between-column">
        <div >
          <h1>Settings</h1>

          <h2>{`Download website data (JSON)`}</h2>
          <button
            onClick={() => { download(JSON.stringify(websiteData), 'websiteData.json') }}
          >Download data</button>

          <h2>{`Load website data (JSON)`}</h2>
          <button
            onClick={() => {
              upload()
            }}
          >
            Upload data</button>

          <h2>{`Time between checks (Minutes 1-120)?`}</h2>
          <div className="inline">

            <input
              type="number"
              min={1}
              max={120}
              placeholder="1-120 (Minutes)"
              value={settingsData.refreshIntervalMinutes}
              onChange={(event) => {
                handleRefreshIntervalChange(event)
              }}
            /> {saved ? <div className="inline"><TiTick /></div> : ''}
          </div>
          {/* <h2>{`(⌐■_■) coming soon below (¬_¬ )`} </h2> */}
        </div>
        <div className="right">
          <button>Save</button>
        </div>

      </div>
    </div>
  );
};

export default Settings;
