import { useRecoilState } from 'recoil';
import { websiteDataState } from '../lib/atom';
import { readFile, saveFileLocal } from '../lib/fileHandling';
import { convertWebsiteDataId, save, saveWebsiteData } from '../lib/saveLoad';

const DeletePrompt = (prop: { name: string, id: number, setCheckingDeletePrompt: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [websiteData, setWebsiteData] = useRecoilState(websiteDataState)

  /**
  * deleteWebsite - function that deletes a website from the websiteData array and saves the updated array
  *
  */
  function deleteWebsite() {
    const postDeleteWebsiteData = websiteData.filter((website: any) => {
      if (website.id !== prop.id) {
        return true
      }
    })
    const modifiedWebsiteData = convertWebsiteDataId(postDeleteWebsiteData)
    saveWebsiteData(modifiedWebsiteData)
    setWebsiteData(modifiedWebsiteData)
    prop.setCheckingDeletePrompt(false);
  }



  return (
    <div className='modal-outer-wrapper' onClick={() => prop.setCheckingDeletePrompt(false)}>
      <div className='modal-inner-wrapper' onClick={(event) => event.stopPropagation()}>
        <h1>{`Are you sure you want to delete "${prop.name}" ?`}</h1>
        <div className='button-flex-row'>
          <button onClick={() => {
            prop.setCheckingDeletePrompt(false);
          }}>Cancel</button>
          <button className='danger' onClick={() => {
            deleteWebsite();
          }}>Delete it</button>
        </div>
      </div>
    </div>
  );
};

export default DeletePrompt;

// Unused code, planning on adding delete prompt in future version to avoid accidental deletion
