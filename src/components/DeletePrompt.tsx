import { useRecoilState } from 'recoil';
import { websiteDataState } from '../lib/atom';
import { readFile, saveFileLocal } from '../lib/fileHandling';

const DeletePrompt = (prop: { website: any, id: any }) => {
  const [websiteData, setWebsiteData] = useRecoilState(websiteDataState)

  function deleteWebsite() {
    const postDeleteWebsiteData = websiteData.filter((website: any) => {
      if (website.id !== prop.id) {
        return true
      }
    })

    console.log(postDeleteWebsiteData);
    setWebsiteData(postDeleteWebsiteData);
    saveLoad(postDeleteWebsiteData)
  }


  async function saveLoad(postDeleteWebsiteData: any) {
    saveFileLocal(JSON.stringify(postDeleteWebsiteData))
    const newData = JSON.parse(await readFile())
    setWebsiteData(newData)
  }

  return (
    <div className='modal-outer-wrapper'>
      <div className='modal-inner-wrapper'>
        <h1>Are you sure?</h1>
        <button onClick={() => {
          deleteWebsite();
        }}>Delete it</button>
        <button onClick={() => {
        }}>Cancel</button>
      </div>
    </div>
  );
};

export default DeletePrompt;

// Unused code, planning on adding delete prompt in future version to avoid accidental deletion
