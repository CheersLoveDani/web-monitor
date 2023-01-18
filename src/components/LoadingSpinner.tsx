import {
  AiOutlineLoading
} from 'react-icons/ai'


// This loading spinner is a standard size and timing with the scss, might be worth creating its own scss and importing directly?
const LoadingSpinner = () => {
  return (
    <>
      <div className='loading-spinner-container'>
        <AiOutlineLoading className='spinner spinner1' />
        <AiOutlineLoading className='spinner spinner2' />
        <AiOutlineLoading className='spinner spinner3' />
      </div>
    </>
  );
};

export default LoadingSpinner;
