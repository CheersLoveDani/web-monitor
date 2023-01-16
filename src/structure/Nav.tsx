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

import { addingWebsiteState, viewModeState } from '../lib/atom';

import logo from '../assets/128x128-white.png'

const Nav = () => {

  const [viewMode, setViewMode] = useRecoilState(viewModeState);
  const [addingWebsite, setAddingWebsite] = useRecoilState(addingWebsiteState)

  /**
  * Refresh the current page
  */
  function refreshPage() {
    window.location.reload();
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

  return (
    <div className="top-row">
      <div className='flex-wrapper start-of-row'>
        <div className="main-logo-wrapper">
          <Link to="/">
            <img src={logo} className="main-logo" />
          </Link>
        </div>
        <div className="icon-button background-hover" onClick={changeViewState}>
          {viewMode ? <BsFillGrid3X3GapFill /> : <GiHamburgerMenu />}
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
