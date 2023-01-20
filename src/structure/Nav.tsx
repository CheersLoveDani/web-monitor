import { useRecoilState } from 'recoil';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from 'react-router-dom'

import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdAddCircleOutline, MdInfoOutline, MdOutlineRefresh, MdOutlineSettings } from 'react-icons/md';

import { addingWebsiteState, settingsDataState, viewModeState } from '../lib/atom';

import logo from '../assets/128x128-white.png'
import { AiFillHome } from 'react-icons/ai';
import { saveSettingsData } from '../lib/saveLoad';

const Nav = () => {

  const [addingWebsite, setAddingWebsite] = useRecoilState(addingWebsiteState)
  const [settingsData, setSettingsData] = useRecoilState(settingsDataState)

  /**
  * Refresh the current page
  */
  function refreshPage() {
    window.location.reload();
  }

  /**
     * Change the view mode between grid and row and save it to settings
     */
  function changeViewState() {
    if (settingsData.viewLayout == 0) {
      setSettingsData({ ...settingsData, viewLayout: 1 })
      saveSettingsData({ ...settingsData, viewLayout: 1 });
    } else {
      setSettingsData({ ...settingsData, viewLayout: 0 })
      saveSettingsData({ ...settingsData, viewLayout: 0 });
    }
  }

  return (
    <div className="top-row">
      <div className='flex-wrapper start-of-row'>
        <div className="main-logo-wrapper">
          <Link to="/">
            <img src={logo} className="main-logo" />
          </Link>
        </div>
        <Link to="/" className="icon-button background-hover">
          <AiFillHome />
        </Link>
        <div className="icon-button background-hover" onClick={changeViewState}>
          {settingsData.viewLayout ? <BsFillGrid3X3GapFill /> : <GiHamburgerMenu />}
        </div>
        <div className="icon-button background-hover" onClick={() => refreshPage()}>
          <MdOutlineRefresh />
        </div>
        <div className="icon-button background-hover" onClick={() => setAddingWebsite(true)}>
          <MdAddCircleOutline />
        </div>
      </div>
      <div className='flex-wrapper end-of-row'>
        <Link to="/info" className="icon-button background-hover" >
          <MdInfoOutline />
        </Link>
        <Link to="/settings" className="icon-button background-hover" >
          <MdOutlineSettings />
        </Link>
      </div>
    </div>
  );
};

export default Nav;
