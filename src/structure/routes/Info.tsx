

const Info = () => {
  return (
    <div className='main-content'>
      <div className="text-padding">
        <h1>Web Monitor</h1>
        <h2>For the most up to date info check out these useful links: </h2>
        <InfoLink name="Github" link="https://github.com/sirdantheawesome/web-monitor/blob/main/README.md" />
        <InfoLink name="Releases" link="https://github.com/sirdantheawesome/web-monitor/releases" />
        <InfoLink name="Trello" link="https://trello.com/b/PFibLBhZ/web-monitor" />
        <InfoLink name="Discord to find me" link="https://discord.gg/zqfsRFU" />
        <h2>Purpose</h2>
        <p>The web monitor app is for checking the status codes of websites to see if they are currently up/ accessible from your connection.</p>
        <h2>The Stack</h2>
        <p>This app was build with <b>Tauri + Vite React + Typescript</b></p>
      </div>
    </div>
  );
};

/**
 * InfoLink - a functional component that displays a clickable link with a name and a link
 * @param {Object} prop - an object containing the properties of the component
 * @param {string} prop.link - the link to be displayed
 * @param {string} prop.name - the name of the link
 * @returns {JSX.Element} - a JSX element that displays the link with the specified name
 */
const InfoLink = (prop: { link: string, name: string }) => {

  /**
   * handleLinkClick - function that handles the click event on a link to open in a new window
   * @param {Event} event - the click event on the link
   */
  function handleLinkClick(event: any) {
    event.preventDefault();
    const link = event.target.href;
    window.open(link, '_blank');
  }

  return (
    <p><b>{prop.name}: </b><a onClick={(event) => handleLinkClick(event)} href={prop.link}>{prop.link}</a></p>
  )
}

export default Info;
