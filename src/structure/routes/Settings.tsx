
const Settings = () => {


  return (
    <div className='main-content'>
      <div className="text-padding flex-between-column">
        <div >

          <h1>Settings</h1>
          <h2>{`(coming soon)`} </h2>
          <h2>{`Download website data (JSON)`}</h2>
          <button>Download data</button>
          <h2>{`Load website data (JSON)`}</h2>
          <button>Load data</button>
          <h2>{`Time between checks (Minutes)?`}</h2>
          <input placeholder="1-120 (Minutes)" />
        </div>
        <div className="right">
          <button>Save</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
