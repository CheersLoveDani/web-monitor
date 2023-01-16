import {
  AiOutlineLoading
} from 'react-icons/ai'

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
