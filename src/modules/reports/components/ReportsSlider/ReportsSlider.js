import s from './ReportsSlider.module.css';

import { ReactComponent as ArrowLeftSVG } from '../../../../images/icons/arrow-left.svg';
import { ReactComponent as ArrowRightSVG } from '../../../../images/icons/arrow-right.svg';
import { useNavigate } from 'react-router-dom';

export default function SliderIncomeExpenses({ header, switchPage }) {
  const navigate = useNavigate();
  return (
    <div className={s.expenses}>
      <button
        className={s.arrow}
        onClick={() => {
          navigate('/reports');
          switchPage(header);
        }}
      >
        <ArrowLeftSVG />
      </button>
      <h2 className={s.header}>{header}</h2>
      <button
        className={s.arrow}
        onClick={() => {
          navigate('/reports');
          switchPage(header);
        }}
      >
        <ArrowRightSVG />
      </button>
    </div>
  );
}
