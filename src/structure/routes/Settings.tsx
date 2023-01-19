import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { websiteDataState } from "../../lib/atom";
import { download, uploadWebsiteData } from "../../lib/downloadUpload";

const Settings = () => {
  const [websiteData, setWebsiteData] = useRecoilState(websiteDataState)

  const navigate = useNavigate();

  async function upload() {
    const newData = await uploadWebsiteData()
    setWebsiteData(newData)
    navigate("/");
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
          <h2>{`(⌐■_■) coming soon below (¬_¬ )`} </h2>
          <h2>{`Time between checks (Minutes)?`}</h2>
          <input
            type="number"
            min={1}
            max={120}
            placeholder="1-120 (Minutes)"
          />
        </div>
        <div className="right">
          <button>Save</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
