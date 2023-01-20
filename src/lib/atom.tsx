import { atom } from 'recoil';

/**
 * atom for handling the state of site loaded
 */
export const siteLoadState = atom({
  key: 'siteLoadState',
  default: false,
});


/**
 * interface for the website layout
 */
interface WebsiteLayout {
  id: number;
  name: string;
  url: string;
}
const websiteArrayInterface: WebsiteLayout[] = [];


/**
 * atom for handling the state of website data
 */
export const websiteDataState = atom({
  key: 'websiteDataState',
  default: websiteArrayInterface,
});


/**
 * atom for handling the state of adding website
 */
export const addingWebsiteState = atom({
  key: 'addingWebsiteState',
  default: false,
});


/**
 * atom for handling the layout of the website view
 */
export const viewModeState = atom({
  key: 'viewModeState',
  default: 0,
});

/**
 * interface for the Settings layout
 */
interface SettingsLayout {
  viewLayout: number
  refreshIntervalMinutes: number
}
const settingsInterface: SettingsLayout = { viewLayout: 0, refreshIntervalMinutes: 60 };


/**
 * atom for handling the settings data
 */
export const settingsDataState = atom({
  key: 'settingsDataState',
  default: settingsInterface,
});