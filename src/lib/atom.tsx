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