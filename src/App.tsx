import "./App.scss"
import Nav from "./structure/Nav"
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import MainView from "./structure/routes/MainView"
import Info from "./structure/routes/Info";
import Settings from "./structure/routes/Settings";
import { useRecoilState } from "recoil";
import { settingsDataState, websiteDataState } from "./lib/atom";
import { readFile } from "./lib/fileHandling";
import { useEffect } from "react";


function App() {
  // Recoil state for the websiteData state, see lib/atoms.tsx
  const [websiteData, setWebsiteData] = useRecoilState(websiteDataState)
  const [settingsData, setSettingsData] = useRecoilState(settingsDataState)

  // UseEffect to load the website data when the component is rendered
  useEffect(() => {
    load()
  }, [])

  /**
   * Load the website data from the local storage
   */
  async function load() {
    const newWebsiteData = JSON.parse(await readFile('data.json'))
    setWebsiteData(newWebsiteData)
    const newSettingsData = JSON.parse(await readFile('settings.json'))
    setSettingsData(newSettingsData)
  }

  return (
    <Router>
      <div className="container">
        <Nav />
        <Routes>
          <Route path="/" element={<MainView />} />
          <Route path="/info" element={<Info />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
