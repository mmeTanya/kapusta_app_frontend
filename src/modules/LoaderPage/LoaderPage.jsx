import { Oval } from 'react-loader-spinner';

import style from './LoaderPage.module.css';

const Spinner = () => {
  return (
    <div className={style.container}>
      <Oval
        ariaLabel="loading-indicator"
        height={50}
        width={50}
        strokeWidth={5}
        color="#FF6B08"
        secondaryColor="#6D7A8D"
      />
    </div>
  );
};

export default Spinner;
